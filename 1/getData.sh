#!/bin/bash
URL=https://adventofcode.com/2020/day/1/input
session=53616c7465645f5fb1873c30a1e05b57e956fd7e515b48d08103ace1ab6b7cac60a14e92dbb599d195c1ff8c9c80716f

curl -o data --cookie "session=$session" $URL
