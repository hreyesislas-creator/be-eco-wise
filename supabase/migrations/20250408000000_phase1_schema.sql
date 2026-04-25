-- Be Eco Wise — Phase 1 schema
-- Run in Supabase SQL Editor or via: supabase db push (if using CLI)

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums (text check constraints for portability)
-- ---------------------------------------------------------------------------
-- Lead pipeline
-- new | contacted | quoted | won | lost

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.service_areas (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  state text,
  region_label text,
  description text,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now()
);

create table public.accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  account_type text,
  notes text,
  created_at timestamptz not null default now()
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references public.accounts (id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  title text,
  created_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  service_area_id uuid not null references public.service_areas (id) on delete restrict,
  contact_id uuid references public.contacts (id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  message text,
  project_type text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create index leads_service_area_id_idx on public.leads (service_area_id);
create index leads_status_idx on public.leads (status);
create index leads_created_at_idx on public.leads (created_at desc);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references public.accounts (id) on delete set null,
  service_area_id uuid references public.service_areas (id) on delete set null,
  lead_id uuid references public.leads (id) on delete set null,
  name text not null,
  status text not null default 'planning',
  created_at timestamptz not null default now()
);

create table public.estimates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects (id) on delete cascade,
  lead_id uuid references public.leads (id) on delete set null,
  status text not null default 'draft',
  total_cents bigint not null default 0,
  valid_until date,
  created_at timestamptz not null default now(),
  constraint estimates_link_chk check (project_id is not null or lead_id is not null)
);

create index estimates_project_id_idx on public.estimates (project_id);
create index estimates_lead_id_idx on public.estimates (lead_id);

create table public.estimate_items (
  id uuid primary key default gen_random_uuid(),
  estimate_id uuid not null references public.estimates (id) on delete cascade,
  line_order int not null default 0,
  description text not null,
  quantity numeric not null default 1,
  unit_price_cents bigint not null,
  created_at timestamptz not null default now()
);

create index estimate_items_estimate_id_idx on public.estimate_items (estimate_id);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads (id) on delete cascade,
  project_id uuid references public.projects (id) on delete cascade,
  contact_id uuid references public.contacts (id) on delete cascade,
  activity_type text not null,
  body text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint activities_subject_chk check (
    lead_id is not null
    or project_id is not null
    or contact_id is not null
  )
);

create index activities_lead_id_idx on public.activities (lead_id);
create index activities_project_id_idx on public.activities (project_id);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  due_date date,
  status text not null default 'open',
  lead_id uuid references public.leads (id) on delete cascade,
  project_id uuid references public.projects (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint tasks_link_chk check (
    lead_id is not null
    or project_id is not null
  )
);

create index tasks_lead_id_idx on public.tasks (lead_id);
create index tasks_project_id_idx on public.tasks (project_id);
create index tasks_status_idx on public.tasks (status);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.service_areas enable row level security;
alter table public.accounts enable row level security;
alter table public.contacts enable row level security;
alter table public.leads enable row level security;
alter table public.projects enable row level security;
alter table public.estimates enable row level security;
alter table public.estimate_items enable row level security;
alter table public.activities enable row level security;
alter table public.tasks enable row level security;

-- Public read: service areas (SEO / location pages)
create policy "service_areas_select_public"
  on public.service_areas for select
  to anon, authenticated
  using (true);

-- Website lead capture: anyone can insert a lead
create policy "leads_insert_public"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- CRM: authenticated staff
create policy "accounts_all_staff"
  on public.accounts for all
  to authenticated
  using (true)
  with check (true);

create policy "contacts_all_staff"
  on public.contacts for all
  to authenticated
  using (true)
  with check (true);

create policy "leads_select_staff"
  on public.leads for select
  to authenticated
  using (true);

create policy "leads_update_staff"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);

create policy "leads_delete_staff"
  on public.leads for delete
  to authenticated
  using (true);

create policy "projects_all_staff"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

create policy "estimates_all_staff"
  on public.estimates for all
  to authenticated
  using (true)
  with check (true);

create policy "estimate_items_all_staff"
  on public.estimate_items for all
  to authenticated
  using (true)
  with check (true);

create policy "activities_all_staff"
  on public.activities for all
  to authenticated
  using (true)
  with check (true);

create policy "tasks_all_staff"
  on public.tasks for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- Seed: service areas — Southern California only (edit / extend in Supabase)
-- ---------------------------------------------------------------------------

insert into public.service_areas (name, slug, state, region_label, description, meta_title, meta_description)
values
  (
    'Moreno Valley',
    'moreno-valley-ca',
    'CA',
    'Southern California',
    'On-site rubber mulch installation for Moreno Valley playgrounds, schools, HOAs, parks, and residential landscapes — planned depth, clean edges, professional finish.',
    'Rubber Mulch Installation in Moreno Valley, CA | Be Eco Wise',
    'Be Eco Wise installs rubber mulch in Moreno Valley for playgrounds, schools, HOAs, parks, and homes. Request a site visit.'
  ),
  (
    'Riverside',
    'riverside-ca',
    'CA',
    'Southern California',
    'Installation-first rubber mulch for Riverside properties: fall zones, common areas, and landscape beds handled by trained crews.',
    'Rubber Mulch Installation in Riverside, CA | Be Eco Wise',
    'Riverside rubber mulch installation for playgrounds, schools, HOAs, and residential sites. Schedule a walkthrough with Be Eco Wise.'
  ),
  (
    'San Bernardino',
    'san-bernardino-ca',
    'CA',
    'Southern California',
    'Rubber mulch surfacing installed for San Bernardino schools, parks, HOAs, and homes — site prep through final grooming.',
    'Rubber Mulch Installation in San Bernardino, CA | Be Eco Wise',
    'San Bernardino rubber mulch installs for playgrounds, municipal parks, HOAs, and landscaping. Contact Be Eco Wise for next steps.'
  ),
  (
    'Ontario',
    'ontario-ca',
    'CA',
    'Southern California',
    'Ontario-area installation services for durable rubber mulch in play areas, HOA entrances, and high-traffic landscape zones.',
    'Rubber Mulch Installation in Ontario, CA | Be Eco Wise',
    'Ontario rubber mulch installation for playgrounds, schools, HOAs, and residential projects. Request a site visit.'
  ),
  (
    'Rancho Cucamonga',
    'rancho-cucamonga-ca',
    'CA',
    'Southern California',
    'Rancho Cucamonga rubber mulch installs with attention to drainage, containment, and a maintained appearance year-round.',
    'Rubber Mulch Installation in Rancho Cucamonga, CA | Be Eco Wise',
    'Serving Rancho Cucamonga with professional rubber mulch installation for playgrounds, HOAs, schools, and parks.'
  ),
  (
    'Corona',
    'corona-ca',
    'CA',
    'Southern California',
    'Corona projects for playgrounds, schools, HOAs, and residential landscapes — we install, we edge, we leave the site job-ready.',
    'Rubber Mulch Installation in Corona, CA | Be Eco Wise',
    'Corona rubber mulch installation for play areas, common areas, and landscape beds. Talk to Be Eco Wise about your site.'
  ),
  (
    'Fontana',
    'fontana-ca',
    'CA',
    'Southern California',
    'Fontana rubber mulch installation focused on safety surfacing depth, stable borders, and HOA- and school-friendly scheduling.',
    'Rubber Mulch Installation in Fontana, CA | Be Eco Wise',
    'Fontana playgrounds, schools, HOAs, and homes — professional rubber mulch installation from Be Eco Wise.'
  ),
  (
    'Redlands',
    'redlands-ca',
    'CA',
    'Southern California',
    'Redlands rubber mulch for civic, educational, association, and residential sites — installation crews, not drop-shipped material only.',
    'Rubber Mulch Installation in Redlands, CA | Be Eco Wise',
    'Redlands rubber mulch installation for parks, schools, HOAs, and residential landscaping. Request a site visit.'
  ),
  (
    'Los Angeles',
    'los-angeles-ca',
    'CA',
    'Southern California',
    'Los Angeles–area rubber mulch installation for playgrounds, campuses, HOAs, parks, and premium residential landscapes.',
    'Rubber Mulch Installation in Los Angeles, CA | Be Eco Wise',
    'Los Angeles rubber mulch installation for schools, parks, HOAs, playgrounds, and homes. Schedule a consult with Be Eco Wise.'
  ),
  (
    'Anaheim',
    'anaheim-ca',
    'CA',
    'Southern California',
    'Anaheim rubber mulch installs for public and private outdoor spaces — consistent depth, defined edges, professional handoff.',
    'Rubber Mulch Installation in Anaheim, CA | Be Eco Wise',
    'Anaheim rubber mulch for playgrounds, schools, HOAs, and residential sites. Installation by Be Eco Wise.'
  ),
  (
    'Santa Ana',
    'santa-ana-ca',
    'CA',
    'Southern California',
    'Santa Ana rubber mulch surfacing for high-use play and landscape areas — planned installs with clear communication.',
    'Rubber Mulch Installation in Santa Ana, CA | Be Eco Wise',
    'Santa Ana rubber mulch installation for playgrounds, schools, HOAs, and parks. Reach out to Be Eco Wise.'
  ),
  (
    'Irvine',
    'irvine-ca',
    'CA',
    'Southern California',
    'Irvine rubber mulch installation for master-planned communities, schools, parks, and residential landscapes — clean, durable finishes.',
    'Rubber Mulch Installation in Irvine, CA | Be Eco Wise',
    'Irvine rubber mulch for HOAs, playgrounds, schools, and homes. Professional installation from Be Eco Wise.'
  );
