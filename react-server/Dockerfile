FROM nginx:1.21-alpine

ARG API_BASE_URL

# COPY REACT FILES INTO DEFAULT NGINX DIR HERE
# This is just a mock file that represents React to demonstrate getting the environment 
# variable to the front-end
COPY index.html /usr/share/nginx/html

# COPY NGINX CONFIGURATION
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.rconf

RUN apk add --no-cache ruby

WORKDIR /etc/nginx/conf.d
RUN erb default.rconf > default.conf
