DROP DATABASE IF EXISTS listings;
CREATE DATABASE listings;
USE listings;

CREATE TABLE listings (
    id                INT AUTO_INCREMENT,
    img               VARCHAR(250),
    house_type        VARCHAR(25),
    location          VARCHAR(100),
    description       VARCHAR(100),
    cost_per_night    INT NOT NULL,
    rating            DECIMAL(5,2),
    votes             INT NOT NULL,
    PRIMARY KEY(id)
);
