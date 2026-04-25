import { createClient } from "@/lib/supabase/server";
import type { ServiceArea } from "@/types/database";

export async function listServiceAreas(): Promise<ServiceArea[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("service_areas")
      .select("*")
      .order("name", { ascending: true });

    if (error) return [];
    return (data ?? []) as ServiceArea[];
  } catch {
    return [];
  }
}

export async function getServiceAreaBySlug(
  slug: string,
): Promise<ServiceArea | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("service_areas")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) return null;
    return data as ServiceArea;
  } catch {
    return null;
  }
}
