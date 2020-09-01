#!/bin/bash
cp -r ../src/app app
docker build -t qooba/aiscissors:dev -f Dockerfile.dev .
docker build -t qooba/aiscissors .
rm -r app
