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

-- Insert sample quiz questions
INSERT INTO quiz_questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('What makes birthdays special?', 'Cake and gifts', 'Friends and family', 'Celebrations and love', 'All of the above', 'D'),
('When do we celebrate birthdays?', 'Every month', 'Once a year', 'Every week', 'Twice a year', 'B'),
('What is the most important part of a birthday?', 'The presents', 'The cake', 'Being with loved ones', 'The decorations', 'C'),
('How should we make someone feel on their birthday?', 'Ignored', 'Special and loved', 'Ordinary', 'Stressed', 'B'),
('What is a birthday wish?', 'A complaint', 'A kind message or hope for someone', 'A demand', 'A joke', 'B');
