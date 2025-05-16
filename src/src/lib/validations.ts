import { z } from 'zod';
import { UserRole, ProfileType } from '@prisma/client';

// User registration schema
export const registerSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string(),
  role: z.nativeEnum(UserRole),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Please enter your password' }),
});

// Player profile schema
export const playerProfileSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  bio: z.string().optional(),
  age: z.number().min(16).max(50).optional(),
  height: z.number().min(150).max(220).optional(), // in cm
  weight: z.number().min(50).max(180).optional(), // in kg
  nationality: z.string().optional(),
  positions: z.array(z.string()).min(1, { message: 'At least one position is required' }),
  experience: z.string().optional(),
  preferredCountries: z.array(z.string()).optional(),
  videoUrls: z.array(z.string().url({ message: 'Please enter a valid URL' })).optional(),
  languages: z.array(z.string()).optional(),
  type: z.literal(ProfileType.PLAYER),
});

// Coach profile schema
export const coachProfileSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  bio: z.string().optional(),
  age: z.number().min(21).max(80).optional(),
  nationality: z.string().optional(),
  positions: z.array(z.string()).min(1, { message: 'At least one coaching position is required' }),
  experience: z.string().optional(),
  preferredCountries: z.array(z.string()).optional(),
  videoUrls: z.array(z.string().url({ message: 'Please enter a valid URL' })).optional(),
  languages: z.array(z.string()).optional(),
  type: z.literal(ProfileType.COACH),
});

// Team schema
export const teamSchema = z.object({
  name: z.string().min(1, { message: 'Team name is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  city: z.string().optional(),
  leagueLevel: z.string().optional(),
  description: z.string().optional(),
  websiteUrl: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  foundedYear: z.number().min(1800).max(new Date().getFullYear()).optional(),
});

// Job listing schema
export const jobListingSchema = z.object({
  title: z.string().min(1, { message: 'Job title is required' }),
  description: z.string().min(1, { message: 'Job description is required' }),
  teamId: z.string().min(1, { message: 'Team is required' }),
  positions: z.array(z.string()).min(1, { message: 'At least one position is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  city: z.string().optional(),
  leagueLevel: z.string().optional(),
  compensation: z.string().optional(),
  housing: z.boolean().default(false),
  contractLength: z.string().optional(),
  tryoutInfo: z.string().optional(),
  visaAssistance: z.boolean().default(false),
  startDate: z.date().optional(),
});

// Application schema
export const applicationSchema = z.object({
  jobListingId: z.string().min(1, { message: 'Job listing is required' }),
  coverLetter: z.string().optional(),
});

// Message schema
export const messageSchema = z.object({
  receiverId: z.string().min(1, { message: 'Recipient is required' }),
  content: z.string().min(1, { message: 'Message content is required' }),
});

// Profile type for use with forms
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type PlayerProfileFormValues = z.infer<typeof playerProfileSchema>;
export type CoachProfileFormValues = z.infer<typeof coachProfileSchema>;
export type TeamFormValues = z.infer<typeof teamSchema>;
export type JobListingFormValues = z.infer<typeof jobListingSchema>;
export type ApplicationFormValues = z.infer<typeof applicationSchema>;
export type MessageFormValues = z.infer<typeof messageSchema>;
