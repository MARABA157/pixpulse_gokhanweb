-- Create marketplace_items table
CREATE TABLE marketplace_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'ETH',
    image TEXT NOT NULL,
    artist_id UUID REFERENCES auth.users(id) NOT NULL,
    details JSONB,
    stats JSONB DEFAULT '{"views": 0, "likes": 0, "shares": 0}'::jsonb,
    is_sold BOOLEAN DEFAULT false,
    buyer_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create marketplace_likes table for many-to-many relationship
CREATE TABLE marketplace_likes (
    item_id UUID REFERENCES marketplace_items(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (item_id, user_id)
);

-- Function to increment views
CREATE OR REPLACE FUNCTION increment_marketplace_views(item_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE marketplace_items
    SET stats = jsonb_set(
        stats,
        '{views}',
        (COALESCE((stats->>'views')::int, 0) + 1)::text::jsonb
    )
    WHERE id = item_id;
END;
$$;

-- Function to toggle like
CREATE OR REPLACE FUNCTION toggle_marketplace_like(item_id UUID, user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    like_exists BOOLEAN;
BEGIN
    -- Check if like exists
    SELECT EXISTS (
        SELECT 1 FROM marketplace_likes
        WHERE item_id = toggle_marketplace_like.item_id
        AND user_id = toggle_marketplace_like.user_id
    ) INTO like_exists;

    IF like_exists THEN
        -- Remove like
        DELETE FROM marketplace_likes
        WHERE item_id = toggle_marketplace_like.item_id
        AND user_id = toggle_marketplace_like.user_id;

        -- Decrement likes count
        UPDATE marketplace_items
        SET stats = jsonb_set(
            stats,
            '{likes}',
            (COALESCE((stats->>'likes')::int, 0) - 1)::text::jsonb
        )
        WHERE id = item_id;
    ELSE
        -- Add like
        INSERT INTO marketplace_likes (item_id, user_id)
        VALUES (toggle_marketplace_like.item_id, toggle_marketplace_like.user_id);

        -- Increment likes count
        UPDATE marketplace_items
        SET stats = jsonb_set(
            stats,
            '{likes}',
            (COALESCE((stats->>'likes')::int, 0) + 1)::text::jsonb
        )
        WHERE id = item_id;
    END IF;
END;
$$;

-- Function to purchase item
CREATE OR REPLACE FUNCTION purchase_marketplace_item(item_id UUID, buyer_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE marketplace_items
    SET 
        is_sold = true,
        buyer_id = purchase_marketplace_item.buyer_id,
        updated_at = NOW()
    WHERE id = item_id
    AND is_sold = false;
END;
$$;

-- Create RLS policies
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON marketplace_items
    FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON marketplace_items
    FOR INSERT
    WITH CHECK (auth.uid() = artist_id);

CREATE POLICY "Enable update for item owner only" ON marketplace_items
    FOR UPDATE
    USING (auth.uid() = artist_id);

-- Likes table policies
ALTER TABLE marketplace_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON marketplace_likes
    FOR SELECT
    USING (true);

CREATE POLICY "Enable insert/delete for authenticated users" ON marketplace_likes
    FOR ALL
    USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX marketplace_items_artist_id_idx ON marketplace_items(artist_id);
CREATE INDEX marketplace_items_created_at_idx ON marketplace_items(created_at DESC);
CREATE INDEX marketplace_likes_item_id_idx ON marketplace_likes(item_id);
CREATE INDEX marketplace_likes_user_id_idx ON marketplace_likes(user_id);
