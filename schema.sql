DROP DATABASE IF EXISTS listings;
CREATE DATABASE listings;
USE listings;

CREATE TABLE listings (
    id                INT AUTO_INCREMENT,
    img               INT,
    house_type        VARCHAR(25),
    location          VARCHAR(100),
    description       VARCHAR(100),
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
  img               VARCHAR
  PRIMARY KEY(id),
);
