# GridironGlobal - Database Schema

## Overview

The GridironGlobal database schema is designed to support all MVP features while maintaining scalability for future enhancements. The schema uses PostgreSQL with Prisma ORM for type safety and efficient querying.

## Entity-Relationship Diagram

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│     User      │       │    Profile    │       │     Team      │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │──1:1──┤ id            │       │ id            │
│ email         │       │ userId        │       │ name          │
│ password      │       │ type          │       │ country       │
│ role          │       │ firstName     │       │ city          │
│ createdAt     │       │ lastName      │       │ leagueLevel   │
│ updatedAt     │       │ bio           │       │ description   │
│ isVerified    │       │ age           │       │ logoUrl       │
│ isActive      │       │ height        │       │ websiteUrl    │
└───────────────┘       │ weight        │       │ foundedYear   │
                        │ nationality    │       │ createdAt     │
                        │ positions      │       │ updatedAt     │
                        │ experience     │       │ ownerId       │──┐
                        │ preferredCountries│    └───────────────┘  │
                        │ videoUrls      │                          │
                        │ resumeUrl      │                          │
                        │ stats          │       ┌───────────────┐  │
                        │ awards         │       │   JobListing  │  │
                        │ languages      │       ├───────────────┤  │
                        │ photoUrl       │       │ id            │  │
                        │ createdAt      │       │ title         │  │
                        │ updatedAt      │       │ description   │  │
                        └───────────────┘       │ teamId        │──┘
                                                │ positions     │
                                                │ country       │
                                                │ city          │
                                                │ leagueLevel   │
┌───────────────┐       ┌───────────────┐       │ compensation  │
│  Application  │       │    Message    │       │ housing       │
├───────────────┤       ├───────────────┤       │ contractLength│
│ id            │       │ id            │       │ tryoutInfo    │
│ jobListingId  │───┐   │ senderId      │       │ visaAssistance│
│ applicantId   │   │   │ receiverId    │       │ startDate     │
│ status        │   │   │ content       │       │ isActive      │
│ coverLetter   │   │   │ read          │       │ createdAt     │
│ createdAt     │   │   │ createdAt     │       │ updatedAt     │
│ updatedAt     │   │   │ updatedAt     │       └───────────────┘
└───────────────┘   │   └───────────────┘
                    │
                    │   ┌───────────────┐
                    │   │   Favorite    │
                    │   ├───────────────┤
                    │   │ id            │
                    │   │ userId        │
                    │   │ profileId     │
                    │   │ jobListingId  │───┘
                    │   │ teamId        │
                    │   │ type          │
                    │   │ createdAt     │
                    │   └───────────────┘
```

## Prisma Schema

```prisma
// This is the Prisma schema file for GridironGlobal

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User model - core authentication and role management
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String?   // Hashed password (null if using OAuth)
  role          UserRole  @default(PLAYER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  isVerified    Boolean   @default(false)
  isActive      Boolean   @default(true)
  
  // Relations
  profile       Profile?
  ownedTeams    Team[]
  sentMessages     Message[]  @relation("MessageSender")
  receivedMessages Message[]  @relation("MessageReceiver")
  applications  Application[] @relation("Applicant")
  favorites     Favorite[]
}

enum UserRole {
  PLAYER
  COACH
  RECRUITER
  ADMIN
}

// Profile model - detailed user information
model Profile {
  id                String   @id @default(cuid())
  userId            String   @unique
  type              ProfileType
  firstName         String
  lastName          String
  bio               String?  @db.Text
  age               Int?
  height            Float?   // In cm
  weight            Float?   // In kg
  nationality       String?
  positions         String[] // Array of positions
  experience        String?
  preferredCountries String[]
  videoUrls         String[] // Array of video URLs
  resumeUrl         String?
  stats             Json?    // Flexible stats storage
  awards            String[] // Array of awards
  languages         String[] // Array of languages
  photoUrl          String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  favorited         Favorite[] @relation("FavoritedProfile")
  
  @@index([userId])
}

enum ProfileType {
  PLAYER
  COACH
}

// Team model - team/organization information
model Team {
  id            String    @id @default(cuid())
  name          String
  country       String
  city          String?
  leagueLevel   String?
  description   String?   @db.Text
  logoUrl       String?
  websiteUrl    String?
  foundedYear   Int?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  ownerId       String
  
  // Relations
  owner         User      @relation(fields: [ownerId], references: [id])
  jobListings   JobListing[]
  favorited     Favorite[] @relation("FavoritedTeam")
  
  @@index([ownerId])
}

// JobListing model - job opportunities
model JobListing {
  id              String    @id @default(cuid())
  title           String
  description     String    @db.Text
  teamId          String
  positions       String[]  // Array of positions
  country         String
  city            String?
  leagueLevel     String?
  compensation    String?
  housing         Boolean   @default(false)
  contractLength  String?
  tryoutInfo      String?
  visaAssistance  Boolean   @default(false)
  startDate       DateTime?
  isActive        Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  team            Team      @relation(fields: [teamId], references: [id], onDelete: Cascade)
  applications    Application[]
  favorited       Favorite[] @relation("FavoritedJob")
  
  @@index([teamId])
  @@index([country])
  @@index([positions])
}

// Application model - job applications
model Application {
  id            String    @id @default(cuid())
  jobListingId  String
  applicantId   String
  status        ApplicationStatus @default(PENDING)
  coverLetter   String?   @db.Text
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  jobListing    JobListing @relation(fields: [jobListingId], references: [id], onDelete: Cascade)
  applicant     User       @relation("Applicant", fields: [applicantId], references: [id], onDelete: Cascade)
  
  @@unique([jobListingId, applicantId])
  @@index([jobListingId])
  @@index([applicantId])
}

enum ApplicationStatus {
  PENDING
  REVIEWING
  ACCEPTED
  REJECTED
  WITHDRAWN
}

// Message model - internal messaging system
model Message {
  id          String    @id @default(cuid())
  senderId    String
  receiverId  String
  content     String    @db.Text
  read        Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Relations
  sender      User      @relation("MessageSender", fields: [senderId], references: [id], onDelete: Cascade)
  receiver    User      @relation("MessageReceiver", fields: [receiverId], references: [id], onDelete: Cascade)
  
  @@index([senderId])
  @@index([receiverId])
}

// Favorite model - saved profiles, teams, or job listings
model Favorite {
  id            String    @id @default(cuid())
  userId        String
  profileId     String?
  jobListingId  String?
  teamId        String?
  type          FavoriteType
  createdAt     DateTime  @default(now())
  
  // Relations
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  profile       Profile?  @relation("FavoritedProfile", fields: [profileId], references: [id], onDelete: Cascade)
  jobListing    JobListing? @relation("FavoritedJob", fields: [jobListingId], references: [id], onDelete: Cascade)
  team          Team?     @relation("FavoritedTeam", fields: [teamId], references: [id], onDelete: Cascade)
  
  @@unique([userId, profileId, type])
  @@unique([userId, jobListingId, type])
  @@unique([userId, teamId, type])
  @@index([userId])
  @@index([profileId])
  @@index([jobListingId])
  @@index([teamId])
}

enum FavoriteType {
  PROFILE
  JOB
  TEAM
}
```

## Schema Explanation

### User Model
The central authentication entity storing core user information:
- Basic authentication details (email, hashed password)
- Role-based access control (player, coach, recruiter, admin)
- Account status flags (verification, active status)
- Timestamps for auditing

### Profile Model
Extended user information specific to players and coaches:
- Personal details (name, bio, physical attributes)
- Football-specific information (positions, experience)
- Media attachments (videos, resume, photo)
- Performance data (stats, awards)
- Preferences (languages, preferred countries)

### Team Model
Represents football teams or organizations:
- Team identity (name, logo, location)
- Team details (league level, description, website)
- Ownership relationship to User

### JobListing Model
Job opportunities posted by teams:
- Job details (title, description, positions)
- Location information (country, city)
- Compensation and benefits (salary, housing, visa)
- Contract information (length, start date, tryout details)
- Status tracking (active/inactive)

### Application Model
Tracks job applications from players/coaches:
- Links job listing to applicant
- Application status workflow
- Supporting information (cover letter)
- Timestamps for tracking

### Message Model
Internal messaging system:
- Sender and receiver relationships
- Message content
- Read status tracking
- Timestamps for conversation ordering

### Favorite Model
Allows users to save profiles, jobs, or teams:
- Polymorphic relationship to different entity types
- Type discrimination for UI filtering
- Unique constraints to prevent duplicates

## Indexing Strategy

The schema includes strategic indexes to optimize common query patterns:
- Foreign key relationships for efficient joins
- Commonly filtered fields (country, positions)
- Search fields for performance
- Unique constraints to maintain data integrity

## Security Considerations

- No sensitive data stored in plain text
- Password fields only store hashed values
- Relationship cascades ensure referential integrity
- Row-level security will be implemented at the Supabase level

This database schema provides a solid foundation for the GridironGlobal MVP while allowing for future expansion and optimization.
