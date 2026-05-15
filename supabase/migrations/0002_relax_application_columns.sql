-- Relax NOT NULL constraints on name/link/answer.
-- The landing form is now email-only; previous required fields are optional
-- and will be NULL going forward. Existing empty-string rows remain valid.

alter table public.applications alter column name drop not null;
alter table public.applications alter column link drop not null;
alter table public.applications alter column answer drop not null;
