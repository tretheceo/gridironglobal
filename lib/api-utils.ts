import { NextResponse, type NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Initialize Prisma client
const prisma = new PrismaClient();

// Create a cache for database queries
const queryCache = new Map();

// Cache TTL in milliseconds (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

/**
 * Cached database query function
 * This function will cache database query results to improve performance
 * @param key - Cache key
 * @param queryFn - Function that performs the database query
 * @param ttl - Time to live in milliseconds
 */
export async function cachedQuery(key: string, queryFn: () => Promise<any>, ttl = CACHE_TTL) {
  // Check if the result is in cache and not expired
  const cached = queryCache.get(key);
  if (cached && cached.timestamp + ttl > Date.now()) {
    console.log(`Cache hit for key: ${key}`);
    return cached.data;
  }

  // Execute the query
  console.log(`Cache miss for key: ${key}, executing query`);
  const data = await queryFn();
  
  // Store the result in cache
  queryCache.set(key, {
    data,
    timestamp: Date.now(),
  });
  
  return data;
}

/**
 * Invalidate cache for a specific key or pattern
 * @param keyPattern - Key or pattern to match for invalidation
 */
export function invalidateCache(keyPattern: string | RegExp) {
  if (typeof keyPattern === 'string') {
    queryCache.delete(keyPattern);
  } else {
    // If it's a RegExp, check all keys
    for (const key of queryCache.keys()) {
      if (keyPattern.test(key)) {
        queryCache.delete(key);
      }
    }
  }
}

/**
 * Optimized API route handler with caching, error handling, and authorization
 * @param req - Next.js request object
 * @param handler - Handler function for the route
 * @param options - Options for the route handler
 */
export async function apiHandler(
  req: NextRequest,
  handler: (req: NextRequest, session?: any) => Promise<NextResponse>,
  options: {
    requireAuth?: boolean;
    allowedRoles?: string[];
    cacheable?: boolean;
    cacheKey?: (req: NextRequest) => string;
    cacheTTL?: number;
  } = {}
) {
  try {
    // Check authentication if required
    if (options.requireAuth) {
      const session = await getServerSession(authOptions);
      
      if (!session) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      
      // Check role if specified
      if (options.allowedRoles && !options.allowedRoles.includes(session.user.role)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      // If cacheable and authenticated, use the cache
      if (options.cacheable && options.cacheKey) {
        const cacheKey = options.cacheKey(req);
        return await cachedQuery(
          cacheKey,
          () => handler(req, session),
          options.cacheTTL
        );
      }
      
      // Otherwise, just call the handler with the session
      return await handler(req, session);
    }
    
    // If not requiring auth but cacheable
    if (options.cacheable && options.cacheKey) {
      const cacheKey = options.cacheKey(req);
      return await cachedQuery(
        cacheKey,
        () => handler(req),
        options.cacheTTL
      );
    }
    
    // Otherwise, just call the handler
    return await handler(req);
  } catch (error) {
    console.error('API error:', error);
    
    // Handle different types of errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }
    
    if (error.code?.startsWith('P2')) {
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 400 }
      );
    }
    
    // Generic error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Optimized database query for paginated results
 * @param model - Prisma model to query
 * @param options - Query options
 */
export async function paginatedQuery(model: any, options: {
  page?: number;
  limit?: number;
  where?: any;
  orderBy?: any;
  include?: any;
  select?: any;
}) {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;
  
  // Execute count query and data query in parallel
  const [total, data] = await Promise.all([
    model.count({ where: options.where }),
    model.findMany({
      skip,
      take: limit,
      where: options.where,
      orderBy: options.orderBy,
      include: options.include,
      select: options.select,
    }),
  ]);
  
  const totalPages = Math.ceil(total / limit);
  
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}
