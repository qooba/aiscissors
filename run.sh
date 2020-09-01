#!/bin/bash

docker run --name aiscissors -d -p 8000:8000 --rm -v $(pwd)/u2net_models:/root/.u2net  qooba/aiscissors 
#docker run --name aiscissors -it -p 8000:8000 --rm -v $(pwd)/src/app:/app -v $(pwd)/u2net_models:/root/.u2net  qooba/aiscissors ./start-reload.sh
