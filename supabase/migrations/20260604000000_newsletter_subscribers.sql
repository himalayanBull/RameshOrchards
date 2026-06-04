/*
  # Newsletter subscribers table

  1. New Table
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `subscribed_at` (timestamp)
      - `source` (text) - where on the site they subscribed from

  2. Security
    - Enable RLS
    - Allow anonymous inserts (public subscribe form)
    - Only service role can read/delete
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text DEFAULT 'website',
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can manage subscribers"
  ON newsletter_subscribers
  FOR ALL
  TO service_role
  USING (true);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
