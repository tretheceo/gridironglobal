import { describe, expect, test } from '@jest/globals';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

describe('GridironGlobal Database Tests', () => {
  // Test user creation and authentication
  describe('User Authentication', () => {
    test('Admin user exists', async () => {
      const admin = await prisma.user.findFirst({
        where: { role: UserRole.ADMIN }
      });
      expect(admin).not.toBeNull();
      expect(admin?.isVerified).toBe(true);
    });

    test('Player users exist', async () => {
      const players = await prisma.user.findMany({
        where: { role: UserRole.PLAYER }
      });
      expect(players.length).toBeGreaterThan(0);
    });

    test('Coach users exist', async () => {
      const coaches = await prisma.user.findMany({
        where: { role: UserRole.COACH }
      });
      expect(coaches.length).toBeGreaterThan(0);
    });

    test('Recruiter users exist', async () => {
      const recruiters = await prisma.user.findMany({
        where: { role: UserRole.RECRUITER }
      });
      expect(recruiters.length).toBeGreaterThan(0);
    });
  });

  // Test profiles
  describe('User Profiles', () => {
    test('Player profiles exist and are linked to users', async () => {
      const playerProfiles = await prisma.profile.findMany({
        where: { type: 'PLAYER' },
        include: { user: true }
      });
      expect(playerProfiles.length).toBeGreaterThan(0);
      playerProfiles.forEach(profile => {
        expect(profile.user).not.toBeNull();
        expect(profile.user.role).toBe(UserRole.PLAYER);
      });
    });

    test('Coach profiles exist and are linked to users', async () => {
      const coachProfiles = await prisma.profile.findMany({
        where: { type: 'COACH' },
        include: { user: true }
      });
      expect(coachProfiles.length).toBeGreaterThan(0);
      coachProfiles.forEach(profile => {
        expect(profile.user).not.toBeNull();
        expect(profile.user.role).toBe(UserRole.COACH);
      });
    });
  });

  // Test teams
  describe('Teams', () => {
    test('Teams exist and are linked to recruiters', async () => {
      const teams = await prisma.team.findMany({
        include: { owner: true }
      });
      expect(teams.length).toBeGreaterThan(0);
      teams.forEach(team => {
        expect(team.owner).not.toBeNull();
        expect(team.owner.role).toBe(UserRole.RECRUITER);
      });
    });
  });

  // Test job listings
  describe('Job Listings', () => {
    test('Job listings exist and are linked to teams', async () => {
      const jobListings = await prisma.jobListing.findMany({
        include: { team: true }
      });
      expect(jobListings.length).toBeGreaterThan(0);
      jobListings.forEach(job => {
        expect(job.team).not.toBeNull();
      });
    });
  });

  // Test applications
  describe('Applications', () => {
    test('Applications exist and link players to jobs', async () => {
      const applications = await prisma.application.findMany({
        include: { 
          applicant: true,
          jobListing: true
        }
      });
      expect(applications.length).toBeGreaterThan(0);
      applications.forEach(application => {
        expect(application.applicant).not.toBeNull();
        expect(application.jobListing).not.toBeNull();
        expect(application.applicant.role).toBe(UserRole.PLAYER);
      });
    });
  });

  // Test messages
  describe('Messaging System', () => {
    test('Messages exist between users', async () => {
      const messages = await prisma.message.findMany({
        include: {
          sender: true,
          receiver: true
        }
      });
      expect(messages.length).toBeGreaterThan(0);
      messages.forEach(message => {
        expect(message.sender).not.toBeNull();
        expect(message.receiver).not.toBeNull();
        expect(message.content.length).toBeGreaterThan(0);
      });
    });
  });

  // Test favorites
  describe('Favorites System', () => {
    test('Favorites exist for jobs and profiles', async () => {
      const favorites = await prisma.favorite.findMany();
      expect(favorites.length).toBeGreaterThan(0);
      
      const jobFavorites = favorites.filter(f => f.type === 'JOB');
      expect(jobFavorites.length).toBeGreaterThan(0);
      
      const profileFavorites = favorites.filter(f => f.type === 'PROFILE');
      expect(profileFavorites.length).toBeGreaterThan(0);
    });
  });
});

// Clean up
afterAll(async () => {
  await prisma.$disconnect();
});
