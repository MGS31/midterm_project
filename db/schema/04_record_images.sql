DROP TABLE IF EXISTS record_images CASCADE;
CREATE TABLE record_images (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  record_id INTEGER REFERENCES records(id) ON DELETE CASCADE,
  img_url VARCHAR (255) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);