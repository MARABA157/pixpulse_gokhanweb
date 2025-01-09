/*
  # Initial Schema Setup

  1. New Tables
    - artworks
    - collections
    - competitions
    - tutorials
    - user_profiles

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist_id uuid REFERENCES auth.users(id),
  image_url text NOT NULL,
  category text NOT NULL,
  likes integer DEFAULT 0,
  comments integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  owner_id uuid REFERENCES auth.users(id),
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create collection_artworks junction table
CREATE TABLE IF NOT EXISTS collection_artworks (
  collection_id uuid REFERENCES collections(id) ON DELETE CASCADE,
  artwork_id uuid REFERENCES artworks(id) ON DELETE CASCADE,
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (collection_id, artwork_id)
);

-- Create competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  prize numeric NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status text DEFAULT 'upcoming',
  winner_id uuid REFERENCES artworks(id),
  created_at timestamptz DEFAULT now()
);

-- Create competition_submissions table
CREATE TABLE IF NOT EXISTS competition_submissions (
  competition_id uuid REFERENCES competitions(id) ON DELETE CASCADE,
  artwork_id uuid REFERENCES artworks(id) ON DELETE CASCADE,
  submitted_at timestamptz DEFAULT now(),
  PRIMARY KEY (competition_id, artwork_id)
);

-- Create tutorials table
CREATE TABLE IF NOT EXISTS tutorials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  level text NOT NULL,
  author_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public artworks are viewable by everyone"
  ON artworks FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own artworks"
  ON artworks FOR INSERT
  WITH CHECK (auth.uid() = artist_id);

CREATE POLICY "Users can view public collections"
  ON collections FOR SELECT
  USING (is_public OR auth.uid() = owner_id);

CREATE POLICY "Users can create their own collections"
  ON collections FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Competition submissions are viewable by everyone"
  ON competition_submissions FOR SELECT
  USING (true);

CREATE POLICY "Users can submit to active competitions"
  ON competition_submissions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM competitions c
    WHERE c.id = competition_id
    AND c.status = 'active'
  ));