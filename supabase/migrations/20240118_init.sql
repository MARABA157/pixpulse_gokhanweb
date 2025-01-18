-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    website TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (id)
);

-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, artwork_id)
);

-- Create saves table
CREATE TABLE IF NOT EXISTS saves (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, artwork_id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create artwork_tags table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS artwork_tags (
    artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE NOT NULL,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (artwork_id, tag_id)
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork_tags ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Artworks policies
CREATE POLICY "Public artworks are viewable by everyone" ON artworks
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own artworks" ON artworks
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own artworks" ON artworks
    FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete their own artworks" ON artworks
    FOR DELETE USING (auth.uid() = creator_id);

-- Likes policies
CREATE POLICY "Public likes are viewable by everyone" ON likes
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own likes" ON likes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" ON likes
    FOR DELETE USING (auth.uid() = user_id);

-- Saves policies
CREATE POLICY "Saves are viewable by the owner" ON saves
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saves" ON saves
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saves" ON saves
    FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Public comments are viewable by everyone" ON comments
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own comments" ON comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON comments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON comments
    FOR DELETE USING (auth.uid() = user_id);

-- Tags policies
CREATE POLICY "Public tags are viewable by everyone" ON tags
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert tags" ON tags
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Artwork tags policies
CREATE POLICY "Public artwork tags are viewable by everyone" ON artwork_tags
    FOR SELECT USING (true);

CREATE POLICY "Only artwork owners can insert tags" ON artwork_tags
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT creator_id FROM artworks WHERE id = artwork_id
        )
    );

CREATE POLICY "Only artwork owners can delete tags" ON artwork_tags
    FOR DELETE USING (
        auth.uid() IN (
            SELECT creator_id FROM artworks WHERE id = artwork_id
        )
    );

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || NEW.id)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- Indexes
CREATE INDEX IF NOT EXISTS profiles_username_idx ON profiles(username);
CREATE INDEX IF NOT EXISTS artworks_creator_id_idx ON artworks(creator_id);
CREATE INDEX IF NOT EXISTS likes_user_artwork_idx ON likes(user_id, artwork_id);
CREATE INDEX IF NOT EXISTS saves_user_artwork_idx ON saves(user_id, artwork_id);
CREATE INDEX IF NOT EXISTS comments_artwork_id_idx ON comments(artwork_id);
CREATE INDEX IF NOT EXISTS tags_name_idx ON tags(name);
