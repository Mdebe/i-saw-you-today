import { supabase } from "../lib/supabase";

export async function saveEncounter(userId, otherUserId, lat, lng) {
  await supabase.from("encounters").insert({
    user_id: userId,
    encounter_user_id: otherUserId,
    latitude: lat,
    longitude: lng,
    timestamp: new Date()
  });
}