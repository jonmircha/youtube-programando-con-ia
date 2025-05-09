import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://YOUR_PROJECT.supabase.co",
  "YOUR_PUBLIC_ANON_KEY"
);
