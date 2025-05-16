# GridironGlobal - Requirements Document

## Product Overview
GridironGlobal is a modern, global American football recruiting and placement platform modeled after Europlayers.com. It serves as a two-sided marketplace connecting:
- **Players & Coaches** seeking international football jobs
- **Teams & Recruiters** offering positions, tryouts, or scouting opportunities

The platform aims to be the go-to global marketplace for international American football talent, combining ease of use, credibility, and monetization tools.

## User Roles

### 1. Player
- Can create and manage personal profile
- Can browse and apply to job opportunities
- Can message teams and recruiters
- Can upload highlight videos and resume
- Can search for teams and opportunities

### 2. Coach
- Similar to player profile but with coaching-specific fields
- Can browse and apply to coaching opportunities
- Can message teams and recruiters
- Can upload resume and credentials
- Can search for teams and opportunities

### 3. Recruiter / Team Admin
- Can create and manage team profile
- Can post job opportunities
- Can browse and search for players/coaches
- Can message players and coaches
- Can view applications and manage applicants
- Can save favorite profiles

### 4. Site Admin
- Can view and manage all users, listings, and messages
- Can approve/ban users or listings
- Can access analytics dashboard
- Can toggle verification status for users

## MVP Features

### User Authentication
- Email/password login
- Optional Google sign-in
- Role-based registration flow
- Secure password management
- Role-based dashboards and redirects

### Player/Coach Profiles
- Profile photo upload and management
- Bio, age, height, weight, nationality fields
- Position(s) selection
- Experience level indicator
- Preferred countries selection
- Video highlights embedding (YouTube/Vimeo)
- Resume upload (PDF)
- Performance stats & awards section
- Language(s) spoken selection
- Verification status badge (manual toggle for MVP)
- Profile visibility settings

### Jobs / Opportunities Board
- Job listings created by teams or recruiters
- Comprehensive filters:
  - Country
  - League level
  - Position
  - Compensation range
  - Housing included
  - Contract length
  - Start date
- Detailed job information:
  - Contract length
  - Tryout information
  - Salary range
  - Accommodation details
  - Visa assistance
- Application functionality
- Application tracking for players/coaches
- Applicants dashboard for teams/recruiters

### Search & Discovery
- Advanced search for players by:
  - Position
  - Nationality
  - Availability
  - Experience level
  - Physical attributes
- Advanced search for teams/jobs by:
  - Country
  - League level
  - Position needed
  - Compensation
- Save favorite profiles or jobs
- Recently viewed profiles

### Messaging System
- Internal chat-style direct messages
- Conversation threading
- Inbox with read/unread indicators
- Message notifications
- Admin moderation capabilities
- Attachment support (future enhancement)

### Admin Panel
- User management (view, edit, approve, ban)
- Listing management (view, edit, approve, remove)
- Message moderation
- Basic analytics dashboard:
  - Active users
  - New registrations
  - Job postings
  - Applications
  - Message volume

### Monetization (Scaffolded for Future Implementation)
- Stripe integration framework
- Premium listing capability
- Boosted visibility options
- Enhanced profile features
- Freemium model structure

## UI/UX Guidelines

### Design Principles
- Modern, sports-centric aesthetic
- Mobile-first responsive design
- Dashboard-style layout for logged-in users
- Clean, intuitive navigation
- Gradient buttons and accents
- Modern typography (Inter, Space Grotesk, or Outfit)

### Color Palette
- Primary: Sports-themed blues and greens
- Secondary: Accent colors for CTAs and highlights
- Neutral: Clean whites and grays for content areas
- Dark mode support

### Page Structure
1. **Homepage**
   - Value proposition
   - Search CTA
   - Featured players/jobs
   - Testimonials
   - How it works section

2. **Job Board**
   - Filterable list of opportunities
   - Card-based job listings
   - Quick apply functionality

3. **Player Search**
   - Advanced filter sidebar
   - Grid/list toggle view
   - Player cards with key information

4. **Profile Pages**
   - Hero section with key stats
   - Tab-based content organization
   - Highlight video section
   - Stats and experience timeline
   - Contact/message button

5. **Dashboards**
   - Player/Coach Dashboard
   - Recruiter Dashboard
   - Admin Dashboard

6. **Forms**
   - Registration flow
   - Profile creation/editing
   - Job posting creation

7. **Authentication Pages**
   - Sign in
   - Register
   - Password reset

8. **Static Pages**
   - About
   - Contact
   - Privacy Policy
   - Terms of Service

### Component Library
- User cards
- Job listing cards
- Search filters
- Form elements
- Navigation components
- Modal dialogs
- Toast notifications
- Loading states

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **State Management**: React Context + SWR/React Query
- **Form Handling**: React Hook Form + Zod

### Backend
- **API Routes**: Next.js API routes
- **Database ORM**: Prisma
- **Authentication**: NextAuth.js
- **File Storage**: Supabase Storage
- **Database**: PostgreSQL (via Supabase)

### DevOps
- **Hosting**: Vercel (frontend) + Supabase (backend + DB)
- **CI/CD**: Vercel integration
- **Version Control**: Git

### Third-party Services
- **Authentication**: NextAuth.js with Google provider
- **Media Upload**: Supabase Storage
- **Payment Processing**: Stripe (scaffolded)

## System Optimizations

- Supabase's row-level security for data protection
- TypeScript for type safety throughout the application
- Tailwind JIT mode for CSS performance
- Global error boundary implementation
- Toast notification system
- Dark mode toggle functionality
- SWR for efficient data fetching and caching
- SEO optimization for public pages
- Responsive design for all device sizes
- Modular architecture for future expansion

## Development Guidelines

- Clean, well-commented code
- Consistent naming conventions
- Comprehensive error handling
- Responsive design testing
- Performance optimization
- Security best practices
- Accessibility compliance
- Modular component structure
- Reusable utility functions
- Comprehensive documentation

## Deliverables

1. Complete codebase with all MVP features
2. Database schema and Prisma migrations
3. Seed script for test data
4. Comprehensive README with setup instructions
5. Component library documentation
6. API documentation
7. Environment variable templates
8. Deployment instructions

This requirements document serves as the foundation for the GridironGlobal MVP development, ensuring all stakeholders have a clear understanding of the project scope, features, and technical implementation.
