# 3. FrontOps

## 1. Dockerfile added.

## 2. Steps for dynamic FQDN for staging and production:

We can define environment variables to pass along as arguments to our build process.
There are several ways to implement this; our solution is the following:

We have a Dockerfile and we are using Yarn to build our app. Therefore, we need to take
care of both tools in order to adjust dynamically our API_BASE_URL.

-   We will need three environment variables:
    APP_ENVIRONMENT ("staging" or "production") - specified in runtime.
    API_BASE_URL_STAGING and API_BASE_URL_PRODUCTION - ".env / process.env" file, directly
    from the command line when running Docker or in a docker-compose file if it exists.
-   We add API_ENVIRONMENT in our Dockerfile config.
-   We need to add some configuration on the React app for it to be able to read the environment
    variables during the building process, so it sets the API_BASE_URL properly along the app. 
    For this, it's possible to use some package that can read the variables and then write some
    config code. E.g.:

    ```
    const API_BASE_URL = process.env.APP_ENVIRONMENT == 'staging' ? 
        process.env.API_BASE_URL_STAGING || process.env.API_BASE_URL_PRODUCTION;
    ```
-   Run the deploy with Docker.

## 3. Versioning of the API:

It is important to keep integrity and availability of the API in order to avoid incidents for clients
making use of it. In my opinion, the most readable and easiest way to version an API is through URI
versioning. For instance:

```
https://api.cool.com/v1/
https://api.cool.com/v2/
https://api.cool.com/v3/
...
```

What is important is to comply with the API contract for a strong reliability from users. An API needs to
to offer and support what is supposed to -at least huge changes are done or there is an inevitable, 
well-informed long-term support cycle. API versioning must not break consumers' applications deliberately.