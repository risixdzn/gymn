import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.SERVICE_ROLE as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
