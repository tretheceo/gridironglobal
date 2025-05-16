import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a helper function to get user by email
export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('User')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) return null;
  return data;
}

// Create a helper function to get user by id
export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('User')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) return null;
  return data;
}

// Create a helper function to upload file to Supabase Storage
export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) throw error;
  return data;
}

// Create a helper function to get public URL for a file
export function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
