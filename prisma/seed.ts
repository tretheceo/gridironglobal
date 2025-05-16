import { PrismaClient, UserRole, ProfileType, ApplicationStatus, FavoriteType } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  // Clear existing data
  await prisma.favorite.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.jobListing.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Database cleared. Creating new seed data...');

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@gridirongloba.com',
      password: await hash('Admin123!', 10),
      role: UserRole.ADMIN,
      isVerified: true,
      isActive: true,
    },
  });

  console.log('Admin user created:', adminUser.id);

  // Create player users
  const playerUsers = [];
  for (let i = 1; i <= 10; i++) {
    const playerUser = await prisma.user.create({
      data: {
        email: `player${i}@example.com`,
        password: await hash('Player123!', 10),
        role: UserRole.PLAYER,
        isVerified: i <= 7, // 70% of players are verified
        isActive: true,
      },
    });
    playerUsers.push(playerUser);
    console.log(`Player ${i} created:`, playerUser.id);
  }

  // Create coach users
  const coachUsers = [];
  for (let i = 1; i <= 5; i++) {
    const coachUser = await prisma.user.create({
      data: {
        email: `coach${i}@example.com`,
        password: await hash('Coach123!', 10),
        role: UserRole.COACH,
        isVerified: i <= 3, // 60% of coaches are verified
        isActive: true,
      },
    });
    coachUsers.push(coachUser);
    console.log(`Coach ${i} created:`, coachUser.id);
  }

  // Create recruiter users
  const recruiterUsers = [];
  for (let i = 1; i <= 5; i++) {
    const recruiterUser = await prisma.user.create({
      data: {
        email: `recruiter${i}@example.com`,
        password: await hash('Recruiter123!', 10),
        role: UserRole.RECRUITER,
        isVerified: i <= 4, // 80% of recruiters are verified
        isActive: true,
      },
    });
    recruiterUsers.push(recruiterUser);
    console.log(`Recruiter ${i} created:`, recruiterUser.id);
  }

  // Player profiles
  const playerProfiles = [];
  const playerFirstNames = ['Michael', 'James', 'David', 'John', 'Robert', 'Thomas', 'William', 'Joseph', 'Richard', 'Charles'];
  const playerLastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];
  const positions = [
    'Quarterback', 'Running Back', 'Wide Receiver', 'Tight End', 'Offensive Tackle', 
    'Offensive Guard', 'Center', 'Defensive End', 'Defensive Tackle', 'Linebacker', 
    'Cornerback', 'Safety', 'Kicker', 'Punter'
  ];
  const countries = ['United States', 'Canada', 'Germany', 'United Kingdom', 'France', 'Italy', 'Spain', 'Austria', 'Sweden', 'Japan'];
  const experienceLevels = ['High School', 'College', 'Semi-Pro', 'Professional'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];

  for (let i = 0; i < playerUsers.length; i++) {
    const playerProfile = await prisma.profile.create({
      data: {
        userId: playerUsers[i].id,
        type: ProfileType.PLAYER,
        firstName: playerFirstNames[i],
        lastName: playerLastNames[i],
        bio: `Experienced football player with a passion for the game. Looking for opportunities to play internationally and develop my skills.`,
        age: Math.floor(Math.random() * 15) + 18, // 18-32
        height: Math.floor(Math.random() * 30) + 170, // 170-200 cm
        weight: Math.floor(Math.random() * 50) + 70, // 70-120 kg
        nationality: countries[Math.floor(Math.random() * countries.length)],
        positions: [positions[Math.floor(Math.random() * positions.length)], positions[Math.floor(Math.random() * positions.length)]].filter((v, i, a) => a.indexOf(v) === i),
        experience: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
        preferredCountries: [countries[Math.floor(Math.random() * countries.length)], countries[Math.floor(Math.random() * countries.length)]].filter((v, i, a) => a.indexOf(v) === i),
        videoUrls: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
        languages: [languages[Math.floor(Math.random() * languages.length)], languages[Math.floor(Math.random() * languages.length)]].filter((v, i, a) => a.indexOf(v) === i),
        photoUrl: `https://randomuser.me/api/portraits/men/${i + 10}.jpg`,
        stats: {
          touchdowns: Math.floor(Math.random() * 30),
          yards: Math.floor(Math.random() * 2000),
          games: Math.floor(Math.random() * 50) + 10,
        },
        awards: [`${Math.floor(Math.random() * 2020) + 2000} League MVP`, `${Math.floor(Math.random() * 2020) + 2000} All-Star`],
      },
    });
    playerProfiles.push(playerProfile);
    console.log(`Player profile ${i + 1} created:`, playerProfile.id);
  }

  // Coach profiles
  const coachProfiles = [];
  const coachFirstNames = ['Robert', 'William', 'Richard', 'Thomas', 'Michael'];
  const coachLastNames = ['Anderson', 'Thompson', 'Martinez', 'Robinson', 'Clark'];
  const coachPositions = ['Head Coach', 'Offensive Coordinator', 'Defensive Coordinator', 'Special Teams Coach', 'Quarterback Coach'];

  for (let i = 0; i < coachUsers.length; i++) {
    const coachProfile = await prisma.profile.create({
      data: {
        userId: coachUsers[i].id,
        type: ProfileType.COACH,
        firstName: coachFirstNames[i],
        lastName: coachLastNames[i],
        bio: `Experienced football coach with a track record of developing talent and winning games. Looking for new coaching opportunities.`,
        age: Math.floor(Math.random() * 25) + 35, // 35-60
        nationality: countries[Math.floor(Math.random() * countries.length)],
        positions: [coachPositions[i]],
        experience: experienceLevels[Math.floor(Math.random() * 2) + 2], // Semi-Pro or Professional
        preferredCountries: [countries[Math.floor(Math.random() * countries.length)], countries[Math.floor(Math.random() * countries.length)]].filter((v, i, a) => a.indexOf(v) === i),
        languages: [languages[Math.floor(Math.random() * languages.length)], languages[Math.floor(Math.random() * languages.length)]].filter((v, i, a) => a.indexOf(v) === i),
        photoUrl: `https://randomuser.me/api/portraits/men/${i + 50}.jpg`,
        awards: [`${Math.floor(Math.random() * 2020) + 2000} Championship Winner`, `${Math.floor(Math.random() * 2020) + 2000} Coach of the Year`],
      },
    });
    coachProfiles.push(coachProfile);
    console.log(`Coach profile ${i + 1} created:`, coachProfile.id);
  }

  // Teams
  const teams = [];
  const teamNames = ['Berlin Thunder', 'Vienna Vikings', 'Barcelona Dragons', 'London Monarchs', 'Amsterdam Admirals', 'Frankfurt Galaxy', 'Rhein Fire', 'Paris Musketeers'];
  const leagueLevels = ['Professional', 'Semi-Professional', 'Amateur', 'University'];
  const teamCities = ['Berlin', 'Vienna', 'Barcelona', 'London', 'Amsterdam', 'Frankfurt', 'Düsseldorf', 'Paris'];

  for (let i = 0; i < recruiterUsers.length; i++) {
    // Each recruiter gets 1-2 teams
    const numTeams = Math.floor(Math.random() * 2) + 1;
    
    for (let j = 0; j < numTeams && (i * 2 + j) < teamNames.length; j++) {
      const teamIndex = i * 2 + j;
      const team = await prisma.team.create({
        data: {
          name: teamNames[teamIndex],
          country: countries[Math.floor(Math.random() * countries.length)],
          city: teamCities[teamIndex],
          leagueLevel: leagueLevels[Math.floor(Math.random() * leagueLevels.length)],
          description: `${teamNames[teamIndex]} is a competitive football team looking for talented players to join our roster.`,
          logoUrl: `https://picsum.photos/seed/${teamNames[teamIndex].replace(' ', '')}/200`,
          websiteUrl: `https://${teamNames[teamIndex].toLowerCase().replace(' ', '')}.example.com`,
          foundedYear: Math.floor(Math.random() * 40) + 1980, // 1980-2020
          ownerId: recruiterUsers[i].id,
        },
      });
      teams.push(team);
      console.log(`Team ${teamIndex + 1} created:`, team.id);
    }
  }

type jobListings: {
  id: string;
  title: string;
  company: string;
  location: string;

  const jobTitles = ['Quarterback Needed', 'Looking for Defensive Linemen', 'Wide Receiver Position Open', 'Offensive Line Coach Wanted', 'Defensive Coordinator Position'];
  const contractLengths = ['1 season', '2 seasons', '1 year', '6 months'];

  for (let i = 0; i < teams.length; i++) {
    // Each team gets 1-3 job listings
    const numJobs = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < numJobs; j++) {
      const jobIndex = (i * 3 + j) % jobTitles.length;
      const jobListing = await prisma.jobListing.create({
        data: {
          title: jobTitles[jobIndex],
          description: `${teams[i].name} is looking for talented players to join our team for the upcoming season. We offer competitive compensation and a great team environment.`,
          teamId: teams[i].id,
          positions: [positions[Math.floor(Math.random() * positions.length)]],
          country: teams[i].country,
          city: teams[i].city,
          leagueLevel: teams[i].leagueLevel,
          compensation: `${Math.floor(Math.random() * 5) + 1}000€/month + bonuses`,
          housing: Math.random() > 0.5,
          contractLength: contractLengths[Math.floor(Math.random() * contractLengths.length)],
          tryoutInfo: `Tryouts will be held on ${new Date(Date.now() + Math.floor(Math.random() * 30) * 86400000).toLocaleDateString()}`,
          visaAssistance: Math.random() > 0.3,
          startDate: new Date(Date.now() + Math.floor(Math.random() * 90) * 86400000),
          isActive: true,
        },
      });
      jobListings.push(jobListing);
      console.log(`Job listing ${i * 3 + j + 1} created:`, jobListing.id);
    }
  }

  // Applications
  const applications = [];
  const applicationStatuses = [ApplicationStatus.PENDING, ApplicationStatus.REVIEWING, ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED];

  for (let i = 0; i < playerUsers.length; i++) {
    // Each player applies to 1-3 jobs
    const numApplications = Math.floor(Math.random() * 3) + 1;
    const appliedJobs = [];
    
    for (let j = 0; j < numApplications; j++) {
      let jobIndex;
      do {
        jobIndex = Math.floor(Math.random() * jobListings.length);
      } while (appliedJobs.includes(jobIndex));
      
      appliedJobs.push(jobIndex);
      
      const application = await prisma.application.create({
        data: {
          jobListingId: jobListings[jobIndex].id,
          applicantId: playerUsers[i].id,
          status: applicationStatuses[Math.floor(Math.random() * applicationStatuses.length)],
          coverLetter: `I am very interested in the ${jobListings[jobIndex].title} position with ${teams.find(t => t.id === jobListings[jobIndex].teamId)?.name}. I believe my skills and experience make me a great fit for your team.`,
        },
      });
      applications.push(application);
      console.log(`Application ${i * 3 + j + 1} created:`, application.id);
    }
  }

  // Messages
  const messages = [];
  const messageContents = [
    'Hi, I saw your profile and I think you would be a great fit for our team.',
    'Thanks for your application. When would you be available for a video interview?',
    'I have a few questions about your experience. Do you have time to chat?',
    'Your profile looks impressive. Are you still looking for opportunities?',
    'We would like to invite you for a tryout. Are you available next month?'
  ];

  // Create some messages between recruiters and players
  for (let i = 0; i < recruiterUsers.length; i++) {
    for (let j = 0; j < 3; j++) {
      const playerIndex = Math.floor(Math.random() * playerUsers.length);
      
      // Recruiter sends message to player
      const message1 = await prisma.message.create({
        data: {
          senderId: recruiterUsers[i].id,
          receiverId: playerUsers[playerIndex].id,
          content: messageContents[Math.floor(Math.random() * messageContents.length)],
          read: Math.random() > 0.5,
        },
      });
      messages.push(message1);
      
      // Player replies
      const message2 = await prisma.message.create({
        data: {
          senderId: playerUsers[playerIndex].id,
          receiverId: recruiterUsers[i].id,
          content: 'Thank you for reaching out. I am definitely interested in learning more about this opportunity.',
          read: Math.random() > 0.5,
        },
      });
      messages.push(message2);
      
      console.log(`Message thread ${i * 3 + j + 1} created between recruiter ${i + 1} and player ${playerIndex + 1}`);
    }
  }

  // Favorites
  const favorites = [];

  // Players favorite jobs
  for (let i = 0; i < playerUsers.length; i++) {
    const numFavorites = Math.floor(Math.random() * 3) + 1;
    const favoritedJobs = [];
    
    for (let j = 0; j < numFavorites; j++) {
      let jobIndex;
      do {
        jobIndex = Math.floor(Math.random() * jobListings.length);
      } while (favoritedJobs.includes(jobIndex));
      
      favoritedJobs.push(jobIndex);
      
      const favorite = await prisma.favorite.create({
        data: {
          userId: playerUsers[i].id,
          jobListingId: jobListings[jobIndex].id,
          type: FavoriteType.JOB,
        },
      });
      favorites.push(favorite);
    }
    
    console.log(`Created ${numFavorites} job favorites for player ${i + 1}`);
  }

  // Recruiters favorite players
  for (let i = 0; i < recruiterUsers.length; i++) {
    const numFavorites = Math.floor(Math.random() * 5) + 1;
    const favoritedPlayers = [];
    
    for (let j = 0; j < numFavorites; j++) {
      let playerIndex;
      do {
        playerIndex = Math.floor(Math.random() * playerProfiles.length);
      } while (favoritedPlayers.includes(playerIndex));
      
      favoritedPlayers.push(playerIndex);
      
      const favorite = await prisma.favorite.create({
        data: {
          userId: recruiterUsers[i].id,
          profileId: playerProfiles[playerIndex].id,
          type: FavoriteType.PROFILE,
        },
      });
      favorites.push(favorite);
    }
    
    console.log(`Created ${numFavorites} player favorites for recruiter ${i + 1}`);
  }

  console.log('Seed completed successfully!');
  console.log(`Created: ${playerUsers.length} players, ${coachUsers.length} coaches, ${recruiterUsers.length} recruiters`);
  console.log(`Created: ${teams.length} teams, ${jobListings.length} job listings, ${applications.length} applications`);
  console.log(`Created: ${messages.length} messages, ${favorites.length} favorites`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
