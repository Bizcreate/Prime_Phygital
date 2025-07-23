-- Seed data for testing
-- Run this after creating tables

-- Insert test users (passwords are 'password123' hashed with bcrypt)
INSERT INTO users (email, password_hash, first_name, last_name, role, email_verified) VALUES
('admin@primephygital.com', '$2b$10$rOzWz8VvKvKvKvKvKvKvKOzWz8VvKvKvKvKvKvKvKOzWz8VvKvKvKu', 'Admin', 'User', 'admin', true),
('creator@primephygital.com', '$2b$10$rOzWz8VvKvKvKvKvKvKvKOzWz8VvKvKvKvKvKvKvKOzWz8VvKvKvKu', 'Product', 'Creator', 'creator', true),
('customer@primephygital.com', '$2b$10$rOzWz8VvKvKvKvKvKvKvKOzWz8VvKvKvKvKvKvKvKOzWz8VvKvKvKu', 'Test', 'Customer', 'customer', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample products
INSERT INTO products (product_id, serial_number, name, brand, description, price, manufacture_date, created_by, current_owner) 
SELECT 
    'PATCH-DEMO-001',
    'SN-DEMO-001',
    'Demo NFC Patch',
    'Prime Phygital',
    'Demonstration NFC iron-on patch for testing',
    29.99,
    CURRENT_DATE,
    u1.id,
    u2.id
FROM users u1, users u2 
WHERE u1.email = 'creator@primephygital.com' 
AND u2.email = 'customer@primephygital.com'
ON CONFLICT (product_id) DO NOTHING;

-- Insert sample challenge
INSERT INTO challenges (name, description, challenge_type, target_value, reward_points, start_date, end_date, created_by)
SELECT 
    'First Scan Challenge',
    'Scan your first NFC product to earn bonus points',
    'scan_count',
    1,
    1000,
    NOW(),
    NOW() + INTERVAL '30 days',
    u.id
FROM users u 
WHERE u.email = 'admin@primephygital.com'
ON CONFLICT DO NOTHING;

-- Initialize user rewards
INSERT INTO user_rewards (user_id, total_points, lifetime_points)
SELECT id, 0, 0 FROM users
ON CONFLICT DO NOTHING;
