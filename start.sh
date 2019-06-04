# start mysql server
service mysql start

mysql -u root < schema.sql

node ./database/seed.js

npm start