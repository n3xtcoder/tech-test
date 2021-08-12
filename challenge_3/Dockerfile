# We setup a multiple-stage Docker build for deployment

# Stage1 - we build the React app (client files)
FROM node:14-alpine AS build
WORKDIR /app
# API environment for dynamic FQND in deployment
ARG APP_ENVIRONMENT
ENV APP_ENVIRONMENT "$APP_ENVIRONMENT"
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./
COPY ./yarn.lock ./
# In case we do not want to show the intallation log, add the --silent flag to Yarn
RUN yarn install --silent
COPY . /app
RUN yarn build

# Stage 2 - we build the final image and serve the React files built previously
# We use Nginx as our web server to be able to make our static files available
FROM nginx:1.19-alpine AS server
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]