-- Creating the 'user' table with email_id as the primary key
CREATE TABLE user (
  email_id VARCHAR(255) PRIMARY KEY,          -- email_id as primary key
  password Text NOT NULL,             -- User's password (hashed)
  phone_number VARCHAR(15),                   -- Phone number (could be variable length)
  image TEXT                                  -- Image field, could store base64 string or image URL
);
-- Create a new 'property_listing' table with 'email_id' referencing 'user(email_id)'
-- Create the 'property_listing' table with latitude and longitude for Google Maps integration
CREATE TABLE property_listing (
  id INT AUTO_INCREMENT PRIMARY KEY,        -- Property ID, auto-incremented
  name VARCHAR(255) NOT NULL,               -- Property name
  price DECIMAL(10, 2) NOT NULL,            -- Property price
  latitude DECIMAL(9, 6) NOT NULL,          -- Latitude in decimal format (up to 6 decimal places)
  longitude DECIMAL(9, 6) NOT NULL,         -- Longitude in decimal format (up to 6 decimal places)
  email_id VARCHAR(255),                    -- Reference to user table's email_id
  description TEXT,                         -- Property description
  FOREIGN KEY (email_id) REFERENCES user(email_id) ON DELETE CASCADE -- Foreign key constraint to 'user'
);


-- Example insert statement (adjust values as needed)
-- INSERT INTO user (email_id, password, phone_number, image)
-- VALUES ('example@example.com', 'hashed_password_string', '1234567890', 'image_data_or_url_here');
