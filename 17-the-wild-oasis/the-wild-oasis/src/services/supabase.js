import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zcagyinqdudrczpwlxfq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYWd5aW5xZHVkcmN6cHdseGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4MjIxMjYsImV4cCI6MjAwNTM5ODEyNn0.uQw5OuUpJ3a1MmlTAMUxwp-d5pg2SMP9S4j_SZGej5I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
