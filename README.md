# Rejoy Backend

Django API for Rejoy Health — authentication, practice, contests, AI chat, community, and catalog data.

## Project layout

```
rejoy-backend/
├── config/           # Django project package (settings, urls, wsgi, exception handler)
├── core/             # Shared models, base APIs, user profile, email, file upload
├── common/           # Cross-cutting re-exports (auth, validators, mixins)
├── authentication/   # Phone/email OTP auth
├── catalog/          # Hospitals, medical colleges, exams (community topics)
├── community/        # Community feed, posts, comments, engagement
├── contest/          # Contests, scoring, reminders
├── practice/         # Practice questions
├── rejoy_ai/         # AI chat threads
├── scripts/          # One-off data tools (e.g. Wikipedia college extract)
├── manage.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── nginx/            # Reverse proxy image
├── dev_conf.d/       # Nginx config for local development
└── prod_conf.d/      # Nginx config for production
```

The Django project lives at the repository root. The `config/` folder holds settings and WSGI entry points.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- For local (non-Docker) development: Python 3.11+ (some deps may not build on newer Python versions)

## Environment variables

Copy `.env.example` to `.env` at the repository root:

| File | Purpose |
|------|---------|
| `.env` | Shared settings (dev and prod) |
| `prod.env` | Production-only overrides (database, etc.) |

At minimum, set `DJANGO_SECRET_KEY` and `ENVIRONMENT` (`development` or `production`). See `.env.example` for the full list (Redis, email, Twilio, AWS, OpenAI, etc.).

| Variable | Notes |
|----------|-------|
| `ENVIRONMENT` | `development` enables DEBUG; `production` uses RDS and strict hosts |
| `REDIS_HOST` | Set to `redis` by Docker Compose for the `api` service |
| `FRONTEND_URL` | Used in emails and deep links |

## Development

Run the stack from the repository root:

```bash
docker compose up --build
```

This starts:

| Service | Description |
|---------|-------------|
| `api` | Django dev server on port **8000** (migrations run on start) |
| `redis` | Cache broker |
| `nginx` | Reverse proxy on port **80** |

### Common dev commands

```bash
# Run migrations
docker compose exec api python manage.py migrate

# Create a superuser
docker compose exec api python manage.py createsuperuser

# Django shell
docker compose exec api python manage.py shell

# Seed medical colleges (see Catalog seeding below)
docker compose exec api python manage.py seed_medical_colleges

# View logs
docker compose logs -f api
```

API is available at `http://localhost:8000`. Through nginx: `http://localhost`.

Main API prefixes:

| Prefix | App |
|--------|-----|
| `api/v1/auth/` | Authentication |
| `api/v1/core/` | Core utilities (presigned uploads, timezone) |
| `api/v1/user/` | User profile |
| `api/v1/practice/` | Practice |
| `api/v1/contests/` | Contests |
| `api/v1/rejoy-ai/` | AI chat |
| `api/v1/community/` | Community feed and posts |

### Local development without Docker

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
set DJANGO_SETTINGS_MODULE=config.settings   # Windows
# export DJANGO_SETTINGS_MODULE=config.settings
python manage.py migrate
python manage.py runserver
```

## Production

Production uses `docker-compose.prod.yml` with Gunicorn and TLS-terminated nginx.

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Production differences:

- **WSGI**: `gunicorn` serves `config.wsgi:application` instead of `runserver`
- **Static files**: `collectstatic` runs on startup; files are shared with nginx via the `django_admin_static_files` volume
- **Env**: loads both `.env` and `prod.env`
- **Nginx**: uses `prod_conf.d/` and expects SSL certs at `/etc/ssl/` on the host
- **Database**: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` in `prod.env`

### Common production commands

```bash
# Deploy / restart
docker compose -f docker-compose.prod.yml up --build -d

# Run migrations only
docker compose -f docker-compose.prod.yml exec api python manage.py migrate

# Collect static files
docker compose -f docker-compose.prod.yml exec api python manage.py collectstatic --noinput

# Seed or refresh medical colleges
docker compose -f docker-compose.prod.yml exec api python manage.py seed_medical_colleges

# Tail API logs
docker compose -f docker-compose.prod.yml logs -f api
```

## Catalog seeding

Medical colleges are loaded from `catalog/seed_data/medical_colleges.json` (flat list, unique slugs). **Maintain the JSON in git locally**; on the server, pull and run the seed command.

### Workflow

```bash
# 1. Local — after editing medical_colleges.json
python manage.py validate_medical_colleges

# 2. Commit and push the JSON

# 3. Server — after deploy / pull
python manage.py seed_medical_colleges
```

### Commands

```bash
# Validate JSON (unique slugs, required name/slug) — run locally before push
python manage.py validate_medical_colleges

# Upsert all rows into the database (validates first)
python manage.py seed_medical_colleges

# Preview counts by region
python manage.py seed_medical_colleges --show-summary

# Dry run (validate + counts, no DB writes)
python manage.py seed_medical_colleges --dry-run

# One region only
python manage.py seed_medical_colleges --region India
```

Regenerate seed data from Wikipedia lists (then edit slugs in JSON as needed):

```bash
python scripts/extract_wikipedia_medical_colleges.py
python manage.py validate_medical_colleges
```

Each JSON row has:

- `name`, `slug` — display name and stable unique identifier
- `source_meta` — internal reference only (Wikipedia page, region key); not exposed in API
- `display_meta` — user-facing fields (`location`, `country`, `region`) stored on `MedicalCollege` and returned in community topic payloads

See [docs/business_logic.md](docs/business_logic.md) for how topics and metadata appear in the community API.

## Documentation

| Doc | Contents |
|-----|----------|
| [docs/business_logic.md](docs/business_logic.md) | Community topics, feed, posts, catalog behavior |
| `.cursor/rules/` | Django coding conventions for this repo |

## Related repos

- Frontend: [rejoy-web](https://github.com/niteshsinha17/rejoy-web)
