-- Copies of the images in RankYak articles (the header image and the images
-- in the body), served from arrowbin.com/blog/images/<path> instead of
-- RankYak's own hosts (media.rankyak.com, cdn.rankyak.com). Written when an
-- article arrives or is first rendered; read by the /blog/images route.
--
-- `path` is RankYak's path, `<number>/<name>.webp`: a copy is stored once per
-- image and never changes, so it is served with a one-year cache.
CREATE TABLE IF NOT EXISTS article_images (
  path text PRIMARY KEY,
  -- Where the image was copied from.
  source_url text NOT NULL,
  content_type text NOT NULL,
  width integer,
  height integer,
  bytes bytea NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
