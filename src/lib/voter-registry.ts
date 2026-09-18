import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

// Supabase limits each response; COC 3.0 has more voters than one response holds.
export async function loadVoterRegistry() {
  const voters: Tables<"voter_registry">[] = [];
  const pageSize = 500;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabase
      .from("voter_registry")
      .select("*")
      .order("name")
      .order("email")
      .range(offset, offset + pageSize - 1);
    if (error) throw error;
    voters.push(...data);
    if (data.length < pageSize) return { data: voters };
  }
}
