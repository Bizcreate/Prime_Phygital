-- Prime Phygital Database Schema
-- Run this script in your Neon database console

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'customer',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id VARCHAR(100) UNIQUE NOT NULL,
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    price DECIMAL(10,2),
    materials TEXT,
    care_instructions TEXT,
    manufacture_date DATE,
    created_by UUID REFERENCES users(id),
    current_owner UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blockchain registrations
CREATE TABLE IF NOT EXISTS blockchain_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    blockchain_network VARCHAR(50) NOT NULL,
    contract_address VARCHAR(100),
    token_id VARCHAR(100),
    transaction_hash VARCHAR(100) UNIQUE NOT NULL,
    block_number BIGINT,
    gas_used BIGINT,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'confirmed'
);

-- NFC tags
CREATE TABLE IF NOT EXISTS nfc_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    nfc_chip_id VARCHAR(100) UNIQUE NOT NULL,
    verification_signature TEXT,
    programming_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_scanned TIMESTAMP WITH TIME ZONE,
    scan_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Ownership history
CREATE TABLE IF NOT EXISTS ownership_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    from_user UUID REFERENCES users(id),
    to_user UUID REFERENCES users(id),
    transaction_type VARCHAR(50) NOT NULL, -- 'mint', 'transfer', 'sale'
    transaction_hash VARCHAR(100),
    blockchain_network VARCHAR(50),
    price DECIMAL(10,2),
    transfer_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT
);

-- User rewards and points
CREATE TABLE IF NOT EXISTS user_rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    total_points INTEGER DEFAULT 0,
    lifetime_points INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    last_activity TIMESTAMP WITH TIME ZONE,
    tier VARCHAR(50) DEFAULT 'bronze',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staking records
CREATE TABLE IF NOT EXISTS staking_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    amount DECIMAL(18,8) NOT NULL,
    blockchain_network VARCHAR(50) NOT NULL,
    staking_pool VARCHAR(100),
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    rewards_earned DECIMAL(18,8) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    transaction_hash VARCHAR(100)
);

-- Wear-to-earn activities
CREATE TABLE IF NOT EXISTS wear_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    activity_type VARCHAR(50) NOT NULL, -- 'wear', 'scan', 'share'
    duration_minutes INTEGER,
    location_data JSONB,
    points_earned INTEGER DEFAULT 0,
    verification_method VARCHAR(50), -- 'nfc_scan', 'gps', 'photo'
    activity_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified BOOLEAN DEFAULT FALSE
);

-- Challenges and campaigns
CREATE TABLE IF NOT EXISTS challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    challenge_type VARCHAR(50) NOT NULL, -- 'wear_time', 'scan_count', 'social_share'
    target_value INTEGER NOT NULL,
    reward_points INTEGER NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User challenge participation
CREATE TABLE IF NOT EXISTS user_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    challenge_id UUID REFERENCES challenges(id),
    current_progress INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    completion_date TIMESTAMP WITH TIME ZONE,
    reward_claimed BOOLEAN DEFAULT FALSE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'reward', 'challenge', 'product', 'system'
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_owner ON products(current_owner);
CREATE INDEX IF NOT EXISTS idx_products_creator ON products(created_by);
CREATE INDEX IF NOT EXISTS idx_blockchain_product ON blockchain_registrations(product_id);
CREATE INDEX IF NOT EXISTS idx_nfc_product ON nfc_tags(product_id);
CREATE INDEX IF NOT EXISTS idx_ownership_product ON ownership_history(product_id);
CREATE INDEX IF NOT EXISTS idx_ownership_user ON ownership_history(to_user);
CREATE INDEX IF NOT EXISTS idx_rewards_user ON user_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_staking_user ON staking_records(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_user ON wear_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_product ON wear_activities(product_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, read);
