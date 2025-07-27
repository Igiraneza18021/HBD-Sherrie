-- Create birthday_settings table for admin configuration
CREATE TABLE IF NOT EXISTS birthday_settings (
  id SERIAL PRIMARY KEY,
  birthday_person_name VARCHAR(255) NOT NULL DEFAULT 'Sherrie Silver',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default birthday person
INSERT INTO birthday_settings (birthday_person_name) 
VALUES ('Sherrie Silver') 
ON CONFLICT DO NOTHING;

-- Create birthday_wishes table for storing user messages
CREATE TABLE IF NOT EXISTS birthday_wishes (
  id SERIAL PRIMARY KEY,
  sender_name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Replace the quiz questions with the better ones from the images
DELETE FROM quiz_questions;

INSERT INTO quiz_questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('What''s the best birthday gift?', 'Money', 'A surprise party', 'A thoughtful handmade gift', 'An expensive gadget', 'C'),
('What''s the perfect birthday cake flavor?', 'Chocolate', 'Vanilla', 'Red Velvet', 'Whatever the birthday person likes!', 'D'),
('What makes a birthday special?', 'Expensive gifts', 'Lots of social media posts', 'Time with loved ones', 'A big party', 'C'),
('What''s the best birthday activity?', 'Shopping spree', 'Movie marathon', 'Adventure outing', 'Whatever makes the birthday person happy!', 'D'),
('How should you celebrate someone''s birthday?', 'Post about it online', 'Buy expensive things', 'Show them you care', 'Throw a huge party', 'C');

-- Add media storage table for birthday videos/audio
CREATE TABLE IF NOT EXISTS birthday_media (
  id SERIAL PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_type VARCHAR(50) NOT NULL, -- 'video' or 'audio'
  mime_type VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
