"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type CreateLeadState = {
  ok: boolean;
  error: string | null;
};

const PROJECT_TYPES = [
  "playground",
  "hoa",
  "school",
  "park",
  "residential",
  "other",
] as const;

function isValidProjectType(v: string): v is (typeof PROJECT_TYPES)[number] {
  return (PROJECT_TYPES as readonly string[]).includes(v);
}

export async function createLead(
  _prev: CreateLeadState,
  formData: FormData,
): Promise<CreateLeadState> {
  const full_name = formData.get("full_name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() || null;
  const message = formData.get("message")?.toString().trim() || null;
  const service_area_id = formData.get("service_area_id")?.toString().trim();
  const project_type_raw = formData.get("project_type")?.toString().trim() ?? "";

  if (!full_name) {
    return { ok: false, error: "Name is required." };
  }
  if (!email) {
    return { ok: false, error: "Email is required." };
  }
  if (!service_area_id) {
    return { ok: false, error: "Please choose a service area." };
  }

  const project_type =
    project_type_raw && isValidProjectType(project_type_raw)
      ? project_type_raw
      : null;

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    service_area_id,
    full_name,
    email,
    phone,
    message,
    project_type,
    status: "new",
    source: "website",
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/dashboard");
  return { ok: true, error: null };
}
