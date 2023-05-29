import { createClient } from "@supabase/supabase-js";
//"http://localhost:54321"
const supabaseUrl = "https://cawxvdrrrqlvmovtwucm.supabase.co";
// const supabaseKey =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhd3h2ZHJycnFsdm1vdnR3dWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUxMzk4ODIsImV4cCI6MTk5MDcxNTg4Mn0.FceSb0eviYgcka6-BXb9R45cLZ4bqA8H_ARGFKnVme8";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
