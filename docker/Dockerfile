FROM pytorch/pytorch:1.6.0-cuda10.1-cudnn7-runtime
RUN pip install rembg==1.0.9 qdi fastapi uvicorn jinja2 aiofiles python-multipart
WORKDIR /app
COPY ./app /app
EXPOSE 8000
CMD ./start-reload.sh
