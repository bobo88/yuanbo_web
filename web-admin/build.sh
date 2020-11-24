#!/bin/bash

git checkout master

rm -rf docker_build/dist_publish

npm run build:publish

cd docker_build

python docker_tool.py

cd ..
