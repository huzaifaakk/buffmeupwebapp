import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://shbpmlitlskpcghgbiuh.supabase.co';
const supabaseAnonKey = 'sb_publishable_1lW8tjnz57vhDhUdGVXb0Q_Kkj9mmDF';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log("Seeding accounts...");

  // Admin
  const adminRes = await supabase.auth.signUp({
    email: 'admin@buffmeup.com',
    password: 'password123'
  });
  console.log("Admin Signup:", adminRes.error ? adminRes.error.message : "Success");
  
  if (adminRes.data?.user) {
    await supabase.from('profiles').insert([
      { id: adminRes.data.user.id, email: 'admin@buffmeup.com', role: 'admin', name: 'System Admin', username: 'sysadmin' }
    ]);
  }

  // Trainer
  const trainerRes = await supabase.auth.signUp({
    email: 'trainer@buffmeup.com',
    password: 'password123'
  });
  console.log("Trainer Signup:", trainerRes.error ? trainerRes.error.message : "Success");
  
  if (trainerRes.data?.user) {
    await supabase.from('profiles').insert([
      { id: trainerRes.data.user.id, email: 'trainer@buffmeup.com', role: 'trainer', name: 'Pro Trainer', username: 'protrainer' }
    ]);
    await supabase.from('trainers').insert([
      { id: crypto.randomUUID(), user_id: trainerRes.data.user.id }
    ]);
  }
}

seed();
