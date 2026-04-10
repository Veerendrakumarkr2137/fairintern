import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const mockInternships = [
  {
    role: "Frontend Engineer Intern (LinkedIn)",
    company: "Google via LinkedIn",
    stipend: "₹45,000/month",
    fairness_score: 10,
    fairness_label: "Fair",
    flags: ["Excellent stipend", "Premium learning", "Clear mentorship"],
    source: "LinkedIn"
  },
  {
    role: "Backend Node.js Intern",
    company: "Zomato via Naukri",
    stipend: "₹30,000/month",
    fairness_score: 9,
    fairness_label: "Fair",
    flags: ["Good stipend", "Skill-building tasks"],
    source: "Naukri"
  },
  {
    role: "Marketing Intern",
    company: "GrowthX",
    stipend: "Unpaid",
    fairness_score: 2,
    fairness_label: "Exploitative Risk",
    flags: ["Unpaid internship", "Production work", "High weekly hours (40)"],
    source: "Direct"
  },
  {
    role: "Data Science Intern",
    company: "AI Solutions",
    stipend: "₹15,000/month",
    fairness_score: 9,
    fairness_label: "Fair",
    flags: ["Good stipend", "Mentorship mentioned"],
    source: "Internshala"
  }
];

async function seed() {
  console.log("Seeding database...");
  
  const { data, error } = await supabase
    .from('internships')
    .insert(mockInternships)
    .select();

  if (error) {
    console.error("Error seeding data:", error.message);
    if (error.message.includes("violates row-level security policy")) {
      console.log("\nTIP: You might need to use the SUPABASE_SERVICE_ROLE_KEY to bypass RLS, or temporarily disable RLS during seeding.");
    }
  } else {
    console.log(`Successfully seeded ${data.length} internships!`);
  }
}

seed();
