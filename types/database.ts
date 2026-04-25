export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export type ServiceArea = {
  id: string;
  name: string;
  slug: string;
  state: string | null;
  region_label: string | null;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
};

export type Lead = {
  id: string;
  service_area_id: string;
  contact_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  message: string | null;
  project_type: string | null;
  status: LeadStatus;
  source: string;
  created_at: string;
};

export type LeadWithArea = Lead & {
  service_areas: Pick<ServiceArea, "name" | "slug" | "state"> | null;
};
