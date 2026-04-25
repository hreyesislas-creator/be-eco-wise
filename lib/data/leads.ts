import { createClient } from "@/lib/supabase/server";
import type { LeadStatus, LeadWithArea } from "@/types/database";

export async function listLeadsForDashboard(
  statusFilter?: LeadStatus | "all",
): Promise<LeadWithArea[]> {
  const supabase = await createClient();
  let q = supabase
    .from("leads")
    .select(
      `*,
      service_areas ( name, slug, state )`,
    )
    .order("created_at", { ascending: false });

  if (statusFilter && statusFilter !== "all") {
    q = q.eq("status", statusFilter);
  }

  const { data, error } = await q;
  if (error) return [];
  return (data ?? []) as LeadWithArea[];
}
