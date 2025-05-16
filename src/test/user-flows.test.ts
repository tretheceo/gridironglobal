import { describe, expect, test } from '@jest/globals';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('GridironGlobal User Flow Tests', () => {
  // Test player user flows
  describe('Player User Flows', () => {
    test('Player can view and apply to job listings', async () => {
      // Get a player user
      const player = await prisma.user.findFirst({
        where: { role: 'PLAYER' },
        include: { profile: true }
      });
      expect(player).not.toBeNull();
      
      // Get job listings
      const jobListings = await prisma.jobListing.findMany({
        where: { isActive: true },
        take: 3
      });
      expect(jobListings.length).toBeGreaterThan(0);
      
      // Check if player can apply (no duplicate applications)
      const jobToApply = jobListings[0];
      const existingApplication = await prisma.application.findFirst({
        where: {
          applicantId: player!.id,
          jobListingId: jobToApply.id
        }
      });
      
      if (!existingApplication) {
        // Create a new application
        const application = await prisma.application.create({
          data: {
            applicantId: player!.id,
            jobListingId: jobToApply.id,
            status: 'PENDING',
            coverLetter: 'Test application cover letter'
          }
        });
        expect(application).not.toBeNull();
        expect(application.applicantId).toBe(player!.id);
        expect(application.jobListingId).toBe(jobToApply.id);
      } else {
        // Application already exists, which is also valid
        expect(existingApplication.applicantId).toBe(player!.id);
      }
    });
    
    test('Player can save favorite jobs', async () => {
      // Get a player user
      const player = await prisma.user.findFirst({
        where: { role: 'PLAYER' }
      });
      expect(player).not.toBeNull();
      
      // Get a job listing not already favorited
      const existingFavorites = await prisma.favorite.findMany({
        where: {
          userId: player!.id,
          type: 'JOB'
        },
        select: { jobListingId: true }
      });
      
      const favoriteJobIds = existingFavorites.map(f => f.jobListingId);
      
      const jobToFavorite = await prisma.jobListing.findFirst({
        where: {
          id: { notIn: favoriteJobIds as string[] }
        }
      });
      
      if (jobToFavorite) {
        // Create a new favorite
        const favorite = await prisma.favorite.create({
          data: {
            userId: player!.id,
            jobListingId: jobToFavorite.id,
            type: 'JOB'
          }
        });
        expect(favorite).not.toBeNull();
        expect(favorite.userId).toBe(player!.id);
        expect(favorite.jobListingId).toBe(jobToFavorite.id);
      } else {
        // All jobs are already favorited, which is fine
        expect(favoriteJobIds.length).toBeGreaterThan(0);
      }
    });
  });

  // Test recruiter user flows
  describe('Recruiter User Flows', () => {
    test('Recruiter can create and manage teams', async () => {
      // Get a recruiter user
      const recruiter = await prisma.user.findFirst({
        where: { role: 'RECRUITER' }
      });
      expect(recruiter).not.toBeNull();
      
      // Check existing teams
      const teams = await prisma.team.findMany({
        where: { ownerId: recruiter!.id }
      });
      
      // Create a new team if the recruiter doesn't have too many
      if (teams.length < 3) {
        const newTeam = await prisma.team.create({
          data: {
            name: `Test Team ${Date.now()}`,
            country: 'Test Country',
            city: 'Test City',
            leagueLevel: 'Amateur',
            description: 'Test team description',
            ownerId: recruiter!.id
          }
        });
        expect(newTeam).not.toBeNull();
        expect(newTeam.ownerId).toBe(recruiter!.id);
      } else {
        // Recruiter already has teams, which is valid
        expect(teams.length).toBeGreaterThan(0);
      }
    });
    
    test('Recruiter can post job listings', async () => {
      // Get a recruiter user
      const recruiter = await prisma.user.findFirst({
        where: { role: 'RECRUITER' }
      });
      expect(recruiter).not.toBeNull();
      
      // Get a team owned by the recruiter
      const team = await prisma.team.findFirst({
        where: { ownerId: recruiter!.id }
      });
      expect(team).not.toBeNull();
      
      // Create a new job listing
      const jobListing = await prisma.jobListing.create({
        data: {
          title: `Test Job ${Date.now()}`,
          description: 'Test job description',
          teamId: team!.id,
          positions: ['Quarterback'],
          country: team!.country,
          city: team!.city,
          isActive: true
        }
      });
      expect(jobListing).not.toBeNull();
      expect(jobListing.teamId).toBe(team!.id);
    });
    
    test('Recruiter can review applications', async () => {
      // Get a recruiter user
      const recruiter = await prisma.user.findFirst({
        where: { role: 'RECRUITER' }
      });
      expect(recruiter).not.toBeNull();
      
      // Get teams owned by the recruiter
      const teams = await prisma.team.findMany({
        where: { ownerId: recruiter!.id },
        select: { id: true }
      });
      expect(teams.length).toBeGreaterThan(0);
      
      const teamIds = teams.map(t => t.id);
      
      // Get job listings for these teams
      const jobListings = await prisma.jobListing.findMany({
        where: { teamId: { in: teamIds } },
        select: { id: true }
      });
      
      const jobIds = jobListings.map(j => j.id);
      
      // Get applications for these jobs
      const applications = await prisma.application.findMany({
        where: { jobListingId: { in: jobIds } }
      });
      
      if (applications.length > 0) {
        // Update an application status
        const application = applications[0];
        const updatedApplication = await prisma.application.update({
          where: { id: application.id },
          data: { status: 'REVIEWING' }
        });
        expect(updatedApplication).not.toBeNull();
        expect(updatedApplication.status).toBe('REVIEWING');
      } else {
        // No applications yet, which can happen
        console.log('No applications found for recruiter teams');
      }
    });
  });

  // Test messaging flows
  describe('Messaging Flows', () => {
    test('Users can send and receive messages', async () => {
      // Get a player and a recruiter
      const player = await prisma.user.findFirst({
        where: { role: 'PLAYER' }
      });
      expect(player).not.toBeNull();
      
      const recruiter = await prisma.user.findFirst({
        where: { role: 'RECRUITER' }
      });
      expect(recruiter).not.toBeNull();
      
      // Create a message from recruiter to player
      const message = await prisma.message.create({
        data: {
          senderId: recruiter!.id,
          receiverId: player!.id,
          content: 'Test message content',
          read: false
        }
      });
      expect(message).not.toBeNull();
      expect(message.senderId).toBe(recruiter!.id);
      expect(message.receiverId).toBe(player!.id);
      
      // Create a reply
      const reply = await prisma.message.create({
        data: {
          senderId: player!.id,
          receiverId: recruiter!.id,
          content: 'Test reply content',
          read: false
        }
      });
      expect(reply).not.toBeNull();
      expect(reply.senderId).toBe(player!.id);
      expect(reply.receiverId).toBe(recruiter!.id);
      
      // Mark message as read
      const updatedMessage = await prisma.message.update({
        where: { id: message.id },
        data: { read: true }
      });
      expect(updatedMessage.read).toBe(true);
    });
  });
});

// Clean up
afterAll(async () => {
  await prisma.$disconnect();
});
