import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nvdymetaxhqmvfvcnjbs.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52ZHltZXRheGhxbXZmdmNuamJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MjkxMjAsImV4cCI6MjA1MzEwNTEyMH0.fNaZzRwCH1N0VDVVKOiG2tr8FUQGU1vzO-tV6znZTiU";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
