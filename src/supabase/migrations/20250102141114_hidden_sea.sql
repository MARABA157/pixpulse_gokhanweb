/*
  # Add artwork likes functionality

  1. New Tables
    - artwork_likes
      - artwork_id (uuid, references artworks)
      - user_id (uuid, references auth.users)
      - created_at (timestamp)

  2. Security
    - Enable RLS on artwork_likes table
    - Add policies for authenticated users
*/

-- Create artwork_likes table
CREATE TABLE IF NOT EXISTS artwork_likes (
  artwork_id uuid REFERENCES artworks(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (artwork_id, user_id)
);

-- Enable RLS
ALTER TABLE artwork_likes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all likes"
  ON artwork_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can like artworks"
  ON artwork_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike their likes"
  ON artwork_likes FOR DELETE
  USING (auth.uid() = user_id);