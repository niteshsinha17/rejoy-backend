# Rejoy Community — Business Logic

Product-level reference for how community features behave. Implementation lives in the `community` and `catalog` Django apps.

---

## Topics

Every post is anchored to exactly one **topic**: a hospital, medical college, or exam.

| Concept | Behavior |
|--------|----------|
| Storage | `Post.topic_type` + `Post.topic_id` — polymorphic reference, not a single FK |
| Catalog | `Hospital`, `MedicalCollege`, and `Exam` live in `catalog`; community resolves display at read time |
| Required on create | Composer must send a topic; posts without one are rejected |
| Attach by ID | Send `topic_type` + `id` when the user picks an existing catalog row |
| Attach by name | **Hospitals only** — send `topic_type` + `name` (optional `logo_url`) to create-or-match |
| Medical colleges & exams | **ID required** — free-text name attach is rejected; user must pick from search |
| Feed filter | `GET /api/v1/community/feed/?topic=<slug>` filters to that topic's posts |
| Hashtag fallback | If `<slug>` is not a catalog topic, the feed treats it as a hashtag name |
| Search | `GET /api/v1/community/topics/search/?q=` searches hospitals, medical colleges, and exams |

**Why polymorphic?** One post table supports multiple topic kinds without nullable FK columns per type.

### Topic types

| `topic_type` | Catalog model | Notes |
|--------------|---------------|-------|
| `hospital` | `Hospital` | May attach by name or id |
| `medical_college` | `MedicalCollege` | Must attach by id |
| `exams` | `Exam` | Must attach by id |

### Medical college display metadata

Many colleges share the same base name (e.g. "Government Medical College"). Each row is a **flat, separate record** — no parent/campus hierarchy.

| Field | Audience | Purpose |
|-------|----------|---------|
| `name` | User | Includes location in parentheses when needed for disambiguation |
| `slug` | System | Unique URL key; one slug per row |
| `subtitle` | User | Short line derived from DB fields (e.g. `Ansari Nagar East · India`) |
| `display_meta` | User | `{ location, country, region }` — helps users identify the right college |
| `source_meta` | Internal | In seed JSON only (Wikipedia page, region); **not** returned by API |

Topic search for medical colleges matches `name`, `location`, `country`, and `region`. Feed text search uses the same fields when resolving topic names.

---

## Feed

| Endpoint | Purpose |
|----------|---------|
| `GET /api/v1/community/feed/` | Main paginated feed |
| `GET /api/v1/community/posts/mine/` | Signed-in user's posts |
| `GET /api/v1/community/bookmarks/` | Signed-in user's saved posts |
| `GET /api/v1/community/rail/recent/` | Sidebar: 10 newest posts |
| `GET /api/v1/community/rail/popular/` | Sidebar: 10 posts by comment count, then likes |

**Query params**

- `sort` — `latest` (default) or `popular`
- `search` — matches title, body text, topic name (including college location/country/region), author, hashtags, comment bodies
- `topic` — topic slug or hashtag name (see Topics)
- `cursor` — cursor pagination

**Popular ranking:** `comment_count` desc, then `like_count`, then `created_at`.

---

## Posts

| Rule | Detail |
|------|--------|
| v0 type | Text only (`post_type: "text"`) |
| Payload | `{ title, body }` where `body` is Lexical JSON `{ json, text }` |
| Slug | URL segment: slugified title + stable hash suffix of PK |
| Author | Signed-in user, or anonymous (`user` NULL) when not authenticated |
| Hashtags | Optional list on create; normalized lowercase, stored in `Hashtag` M2M |
| Counters | `like_count`, `comment_count` denormalized on `Post`; updated in services |

**Create:** `POST /api/v1/community/post/create/` with `{ post_type, payload, topic, hashtags? }`.

**Detail:** `GET /api/v1/community/posts/<slug>/` — same shape as a feed item; comments loaded separately.

**Topic payload examples**

```json
{ "topic_type": "hospital", "id": 42 }
{ "topic_type": "hospital", "name": "Apollo Hospital", "logo_url": "https://..." }
{ "topic_type": "medical_college", "id": 108 }
{ "topic_type": "exams", "id": 7 }
```

---

## Comments & Replies

| Rule | Detail |
|------|--------|
| Top-level | `Comment` on a post; increments `Post.comment_count` on create |
| Replies | `CommentReply` on a comment; increments `Comment.reply_count` on create |
| Anonymous | Unsigned users may comment/reply; author FK is NULL → shown as "Anonymous" |
| List | `GET /api/v1/community/posts/<slug>/comments/` — cursor-paginated; each comment includes first page of replies |
| More replies | `GET /api/v1/community/comments/<id>/replies/?cursor=` |
| Add comment | `POST /api/v1/community/posts/<slug>/comment/` |
| Add reply | `POST /api/v1/community/comments/<id>/reply/` |

Replies do **not** increase `Post.comment_count`. Counts are maintained incrementally in the service layer — no full-table resync.

---

## Engagement

| Action | Endpoint | Auth |
|--------|----------|------|
| Like / unlike post | `POST /api/v1/community/posts/<slug>/like/` | Required |
| Bookmark add/remove | `POST /api/v1/community/posts/<slug>/bookmark/` body `{ action }` | Required |

Likes toggle idempotently and update `Post.like_count`.

---

## Catalog (reference data)

| Entity | `topic_type` | Slug |
|--------|--------------|------|
| Hospital | `hospital` | Generated from name on first save |
| Medical college | `medical_college` | Explicit `slug` in seed JSON (unique); upserted by slug |
| Exam | `exams` | Generated from name on first save |

### Medical college seed data

- File: `catalog/seed_data/medical_colleges.json` (maintained in git locally)
- Validate: `python manage.py validate_medical_colleges` (run before push)
- Seed: `python manage.py seed_medical_colleges` (run on server after deploy)
- Loader: `catalog/seed_data/medical_colleges_loader.py`
- Upsert key: `slug` (updates `name`, `location`, `country`, `region` when changed)
- Validation: rejects duplicate slugs and missing `name` / `slug`

Wikipedia extract (regenerate JSON):

```bash
python scripts/extract_wikipedia_medical_colleges.py
```

---

## Future post types

The API uses a generic `post_type` + `payload` pattern. v0 exposes text only; other types can be added without breaking existing clients.
