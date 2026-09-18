# Panch portal cloud migration

The portal now targets Supabase Cloud project `youlglwtdscgwhwoyore`.
The website remains at `https://coc.iimbg.com` on its existing host.
Only the public project URL and publishable key belong in frontend build settings.

## Database

The target's eight previous application tables were preserved in the private
`panch_before_20260918` schema. Authentication users were preserved. The portal's
schema was installed and the existing administrator was assigned the `admin`
role. The complete migration first passed inside a rolled-back transaction.

Imported 1,658 unique student registrations across six clans, including 91 DBAI
students. Candidates and votes start empty. Voting remains closed until the
administrator sets up the new candidates and election rules.

824 students retain nonempty email addresses from the previous registry. The
remaining 834 use unique, non-deliverable `@unverified.invalid` placeholders;
833 students without source gender use `Prefer not to say`. These are not
verified institutional addresses or inferred genders. Polling-station lookup
uses registration numbers. Replace placeholders when official details arrive.

## Frontend

Added DBAI to the client batch types and voter editor. The voter registry loader
fetches deterministic pages so the 1,658 students are not truncated by the API's
per-response limit; voter management and the statistics views share this loader.

## Validation

- Production Vite build and TypeScript check passed.
- Cloud API reports 1,658 voters and 91 DBAI students.
- Authenticated cloud API confirms the existing user's admin role.
- Browser password login reaches the admin dashboard and shows 1,658 voters.

## Recovery

Pre-migration SQL backup and migration transaction scripts are in the private
task directory `/private/tmp/panch-portal-20260918/`. They contain personal data
and must not be committed. The preserved schema also retains the original
target tables. Previous frontend source was commit `8c092dc` and used cloud
project `qjarqwllpnfvugerbcfj`; rolling the website back requires restoring its
three public Supabase build environment values as well as its source/image.
