#!/bin/bash

# Imports CSV *or* reads SQL file(s) into an sqlite3 database

# Options:
#   -refresh: removes and recreates the more_listings database with local schema.sql
#   -sql: parses all file arguments as .sql insertions
#   -csv: parses all file arguments as .csv imports
# Arguments:
#   Table names which can be found in filenames in the current directory,
#   formatted as: 'sql_[table-name].[extension]'
#   Extension must be either .csv or .sql

# Create or replace a more_listings database in SQLite3
if [ $1 = "-refresh" ]; then
  rm mini_more_listings.db
  sqlite3 mini_more_listings.db ".read schema.sql"
  shift
fi
# Apply my schema file to the database

# Handle .sql and .csv files differently
case "$1" in
  -sql) 
    shift
    for arg in "$@"
    do
      echo "Running SQL seed..."
      sqlite3 mini_more_listings.db -cmd "begin transaction;" ".separator ," ".read mini_${arg}_table.sql" "commit;"
    done
    ;;
  -csv)
    shift
    for arg in "$@"
    do
      echo "Running CSV seed..."
      sqlite3 mini_more_listings.db -cmd ".separator ," ".import mini_${arg}_table.csv ${arg}" 
    done
    ;;
  *) echo "Option $1 not recognized" ;;

  esac

echo "Done with seed"

sqlite3 mini_more_listings.db