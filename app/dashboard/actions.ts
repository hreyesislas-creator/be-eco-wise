"use server";

import { createClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/types/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
];

function isLeadStatus(v: string): v is LeadStatus {
  return (STATUSES as readonly string[]).includes(v);
}

export async function updateLeadStatusFromForm(formData: FormData) {
  const leadId = formData.get("lead_id")?.toString().trim();
  const status = formData.get("status")?.toString().trim() ?? "";
  if (!leadId || !isLeadStatus(status)) {
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId);

  if (!error) {
    revalidatePath("/dashboard");
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
