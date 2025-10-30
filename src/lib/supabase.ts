import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Pledge {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  state?: string;
  profile_type: 'Student' | 'Working Professional' | 'Other';
  commitments: string[];
  commitment_count: number;
  created_at: string;
}

export interface PledgeFormData {
  name: string;
  email: string;
  mobile: string;
  state: string;
  profile_type: 'Student' | 'Working Professional' | 'Other';
  commitments: string[];
}

export interface KPIStats {
  total: number;
  students: number;
  professionals: number;
  workshops: number;
}
