#!/bin/bash

# Export data of given table names to CSV files

for arg in "$@"
do
  echo "Exporting ${arg} data to CSV"
  sqlite3 more_listings.db -cmd ".header on" ".mode csv" ".output ${arg}.csv" "SELECT rowid, * from ${arg};" ".quit"
done