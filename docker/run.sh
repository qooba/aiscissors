#!/bin/bash


docker run --name jupyter -d --rm -p 8888:8888 -v $(pwd)/jupyter:/root/.jupyter -v /home/qba/Qooba/Jupyter/Test:/opt/notebooks qooba/miniconda3 /bin/bash -c "jupyter lab --notebook-dir=/opt/notebooks --ip='0.0.0.0' --port=8888 --no-browser --allow-root --NotebookApp.password='' --NotebookApp.token=''"

