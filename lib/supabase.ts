import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rhwhfympnkzpomrxzhlj.supabase.co";
const supabaseKey = "sb_publishable_DHtkBu1VnAtdWlgkGmWRWQ_RfBw9d3l";

export const supabase = createClient(supabaseUrl, supabaseKey);