DROP DATABASE IF EXISTS listings;
CREATE DATABASE listings;
USE listings;

CREATE TABLE listings (
  id                INT AUTO_INCREMENT,
  owner             INT,
  img               INT,
  house_type        TEXT,
  location          TEXT,
  description       TEXT,
  cost_per_night    INT NOT NULL,
  rating            DECIMAL(5,2),
  votes             INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(id) REFERENCES photos(url);
);

CREATE TABLE listing_relations (
  id                INT AUTO_INCREMENT,
  id_a              INT NOT NULL,
  id_b              INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(id_a) REFERENCES listings(id);
  FOREIGN KEY(id_b) REFERENCES listings(id;
);

CREATE TABLE photos (
  id                INT AUTO_INCREMENT,
  img               TEXT
  PRIMARY KEY(id)
);

CREATE TABLE users (
  id                INT AUTO_INCREMENT,
  firstname         TEXT,
  lastname          TEXT,
  email             TEXT,
  PRIMARY KEY(id)
)

CREATE TABLE reports (
  id                INT AUTO_INCREMENT,
  listing           INT,
  author            INT,
  positive          BOOLEAN,
  report            TEXT,
  created           DATETIME,
  PRIMARY KEY(id),
  FOREIGN KEY(author) REFERENCES users(id),
  FOREIGN KEY(listing) REFERENCES listings(id),
);