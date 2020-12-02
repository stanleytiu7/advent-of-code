#!/bin/bash
URL=$1
session=$2

curl -o data --cookie "session=$session" $URL
