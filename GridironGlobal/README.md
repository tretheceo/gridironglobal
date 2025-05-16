# GridironGlobal - README

## Overview

GridironGlobal is a modern, global American football recruiting and placement platform that connects players and coaches with teams and recruiters worldwide. This platform serves as a marketplace for international American football talent, combining ease of use, credibility, and monetization tools.

## Features

### User Roles
- **Player**: Athletes seeking international football opportunities
- **Coach**: Coaches looking for positions with teams
- **Recruiter/Team Admin**: Team representatives offering positions and scouting talent
- **Site Admin**: Platform administrators managing the overall system

### Key Features
- Comprehensive profile creation for players and coaches
- Team management and job listing creation for recruiters
- Advanced search and filtering capabilities
- Application submission and tracking
- Internal messaging system
- Verification system for credibility
- Favorites/bookmarking system
- Role-specific dashboards with relevant statistics
- Responsive design for all devices
- Dark mode support

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: NextAuth.js with Supabase integration
- **Storage**: Supabase Storage
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or Supabase account)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gridirongloba.git
cd gridirongloba
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Copy the `.env.example` file to `.env.local` and fill in your environment variables:
```bash
cp .env.example .env.local
```

4. Set up the database
```bash
npx prisma migrate dev
```

5. Seed the database with test data
```bash
npx prisma db seed
```

6. Run the development server
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

The following environment variables are required:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gridirongloba"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Google Auth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email (optional for password reset)
EMAIL_SERVER="smtp://username:password@smtp.example.com:587"
EMAIL_FROM="noreply@gridirongloba.com"
```

## Project Structure

```
/src
  /app                 # Next.js App Router pages and layouts
    /api               # API routes
    /auth              # Authentication pages
    /dashboard         # Dashboard pages for different user roles
    /profile           # Profile management pages
    /jobs              # Job listing pages
    /players           # Player discovery pages
    /teams             # Team pages
    /messages          # Messaging system pages
    /admin             # Admin dashboard and tools
  /components          # React components
    /cards             # Card components (player, job, team)
    /forms             # Form components
    /layout            # Layout components
    /shared            # Shared components
    /ui                # UI components
  /lib                 # Utility functions and hooks
  /prisma              # Prisma schema and migrations
/public                # Static assets
/docs                  # Documentation
```

## Database Schema

The database schema includes the following models:

- **User**: Authentication and role management
- **Profile**: Detailed information for players and coaches
- **Team**: Team information and management
- **JobListing**: Job opportunities posted by teams
- **Application**: Job applications from players/coaches
- **Message**: Internal messaging system
- **Favorite**: Saved items (jobs, profiles, teams)

## Deployment

The project is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Configure the environment variables
5. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.io/)
- [NextAuth.js](https://next-auth.js.org/)
