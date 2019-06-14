#!/bin/bash

# Export data of given table names to CSV files

for arg in "$@"
do
  echo "Exporting ${arg} data to CSV"
  sqlite3 mini_more_listings.db -cmd ".header on" ".mode csv" ".output ./neo4j/mini_${arg}.csv" "SELECT rowid, * from ${arg};" ".quit"
done