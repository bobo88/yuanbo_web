#!/bin/bash

git checkout feature

rm -rf docker_build/dist_test

npm run build:dev

cd docker_build

python docker_tool_test.py

cd ..

