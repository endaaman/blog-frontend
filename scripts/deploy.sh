#!/bin/bash

docker build . --tag endaaman/blog-frontend
# docker run -p 8000:8000 endaaman/blog-frontend:latest
docker push endaaman/blog-frontend
