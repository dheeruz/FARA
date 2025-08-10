-- 1. Create the database
CREATE DATABASE IF NOT EXISTS event_planner;

-- 2. Use the database
USE event_planner;

-- 3. Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. (Optional) Update user authentication method and password
-- Replace 'your_username' and 'your_password' with actual values
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dheeraj123';
FLUSH PRIVILEGES;

-- 5. View all entries in the contacts table
SELECT * FROM contacts;

ALTER TABLE contacts ADD COLUMN reply TEXT;


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

select * from users;
INSERT INTO users (username, password_hash) 
VALUES ('admin', 'admin123');

DELETE FROM users WHERE username = 'admin';

ALTER TABLE users CHANGE password_hash password TEXT NOT NULL;

ALTER TABLE users ADD COLUMN password TEXT;
CHECK TABLE users;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password TEXT NOT NULL
);

SELECT * FROM users;


CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    date DATE,
    location VARCHAR(100)
);

INSERT INTO events (title, description, date, location) VALUES
("TechTalk 2025", "AI in modern development", "2025-08-20", "Auditorium Hall A"),
("Hackathon", "24-hour coding competition", "2025-09-05", "Lab 3"),
("Workshop: Cybersecurity", "Hands-on with penetration testing", "2025-08-30", "Room 101");


select * from events;