-- ============================================================
-- FlashGenius — Initial Schema
-- Run this in your Supabase SQL editor (or via supabase db push)
-- ============================================================

-- profiles: one row per authenticated user
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at  timestamptz not null default now()
);

-- decks: a collection of flashcards owned by a user
create table public.decks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  title       text not null,
  description text,
  created_at  timestamptz not null default now()
);

-- cards: individual flashcards belonging to a deck
create table public.cards (
  id         uuid primary key default gen_random_uuid(),
  deck_id    uuid not null references public.decks (id) on delete cascade,
  front      text not null,
  back       text not null,
  created_at timestamptz not null default now()
);

-- study_sessions: tracks a user studying a deck
create table public.study_sessions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  deck_id    uuid not null references public.decks (id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at   timestamptz
);

-- card_reviews: one row per card reviewed in a session
create table public.card_reviews (
  id          uuid primary key default gen_random_uuid(),
  card_id     uuid not null references public.cards (id) on delete cascade,
  session_id  uuid not null references public.study_sessions (id) on delete cascade,
  was_correct boolean not null,
  reviewed_at timestamptz not null default now()
);

-- ============================================================
-- Row-Level Security
-- ============================================================

alter table public.profiles       enable row level security;
alter table public.decks          enable row level security;
alter table public.cards          enable row level security;
alter table public.study_sessions enable row level security;
alter table public.card_reviews   enable row level security;

-- profiles: users can read and update only their own profile
create policy "profiles: own row" on public.profiles
  for all using (auth.uid() = id);

-- decks: users can do anything with their own decks
create policy "decks: own rows" on public.decks
  for all using (auth.uid() = user_id);

-- cards: users can access cards in decks they own
create policy "cards: own deck" on public.cards
  for all using (
    exists (
      select 1 from public.decks
      where decks.id = cards.deck_id
        and decks.user_id = auth.uid()
    )
  );

-- study_sessions: users can access their own sessions
create policy "study_sessions: own rows" on public.study_sessions
  for all using (auth.uid() = user_id);

-- card_reviews: users can access reviews inside their own sessions
create policy "card_reviews: own sessions" on public.card_reviews
  for all using (
    exists (
      select 1 from public.study_sessions
      where study_sessions.id = card_reviews.session_id
        and study_sessions.user_id = auth.uid()
    )
  );

-- ============================================================
-- Trigger: auto-create a profile row when a user signs up
-- ============================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', new.email)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
