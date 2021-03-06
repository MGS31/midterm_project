DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  record_id INTEGER REFERENCES records(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
