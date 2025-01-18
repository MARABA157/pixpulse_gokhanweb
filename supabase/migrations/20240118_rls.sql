-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Artworks policies
CREATE POLICY "Public artworks are viewable by everyone" ON artworks
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert artworks" ON artworks
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own artworks" ON artworks
    FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete own artworks" ON artworks
    FOR DELETE USING (auth.uid() = creator_id);

-- Likes policies
CREATE POLICY "Public likes are viewable by everyone" ON likes
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert likes" ON likes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete own likes" ON likes
    FOR DELETE USING (auth.uid() = user_id);

-- Saves policies
CREATE POLICY "Users can view own saves" ON saves
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert saves" ON saves
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete own saves" ON saves
    FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Public comments are viewable by everyone" ON comments
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert comments" ON comments
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own comments" ON comments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" ON comments
    FOR DELETE USING (auth.uid() = user_id);
