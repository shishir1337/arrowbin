-- Articles RankYak writes and sends to /api/rankyak-webhook. Only the webhook
-- writes this table; the blog pages read it.
--
-- `id` is the article id RankYak assigns: it is the primary key, never
-- generated here, so an update to an article (event "article.updated")
-- replaces its row instead of adding a second one.
CREATE TABLE IF NOT EXISTS articles (
  id bigint PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  meta_title text,
  meta_description text,
  -- The article body without the title, as HTML and as Markdown.
  html text,
  markdown text,
  header_image_url text,
  status text NOT NULL CHECK (status IN ('published', 'draft')),
  publish_at timestamptz,
  published_at timestamptz,
  updated_at timestamptz,
  archived_at timestamptz,
  received_at timestamptz NOT NULL DEFAULT now()
);

-- The blog index: published, not archived, newest first.
CREATE INDEX IF NOT EXISTS articles_listed_idx
  ON articles (published_at DESC)
  WHERE status = 'published' AND archived_at IS NULL;
