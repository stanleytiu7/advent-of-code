#!/bin/bash
URL=$1
session=$2
file=$3

curl -o $3/data --cookie "session=$session" $URL
