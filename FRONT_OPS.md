
JUST FYI: I had to take a look at React documentation for a deployment where the API_BASE_URL was not added during the build. I solved a bit of the problem by implementing it to understand how this solution works in detail. I normally would add the URL during the build in a CI/CD pipeline, which is conventionally the way I have been exposed to building most SPA (Single Page Applications) with Webpack. Instead, this approach that was requested, injects the API_BASE_URL variable into the HTTP request for the client, which is then loaded by their browser.

Build time: https://create-react-app.dev/docs/adding-custom-environment-variables/
Runtime with server injection: https://create-react-app.dev/docs/title-and-meta-tags#generating-dynamic-meta-tags-on-the-server

These are the steps for the deployment to inject the ENV varaible into the React-Server:

1. Create Dockerfile for React-Nginx server
  a. Configure substitution module in Nginx
  b. Place variable substitution in React application index.html (Mocked out for our purposes)
  c. Introduce argument in Dockerfile passed to front-end Nginx through substition module.
2. `cd react-server && docker build --tag react-server --build-arg API_BASE_URL=https://myurl.com .`
3. `docker run -it --rm -d -p 80:80 --name web react-server`
4. Find window.API_BASE_URL to equal the ENV variable passed to application (where React would see it)

The API_BASE_URL is therefore injected into the server Docker container on the build.

This allows us to deploy a Docker image to a Kubernetes cluster or equivalent service depending on what is availble in the cloud provider (Google, AWS, Azure, OpenShift, etc.).

I would use CI/CD (Continuous Integration/Continuous Deployment) to create a pipeline which would be reused for production and staging deployment, but 'master'/'main' would inject the API_BASE_URL for production while the 'staging' branch would inject the API_BASE_URL for staging.

Q. How would you deploy the frontend so that the same build (minified JS, CSS
and HTML) can be used in production and staging deployments?

A. I would transpile the front-end application using Webpack to minify and package the JS, CSS, and HTML so that it can be served to the client quickly over HTTP. The index.html file be loaded and the API_BASE_URL injected into the React application through JavaScript.

Q. How would I handle versioning the API?

A. My understanding about your business is that you are building applications for multiple clients. Therefore, we cannot handle n + 1 branches of code every time we version the API to support each client. We would run out of development resources if the team size was kept the same.

ie. https://myurl.com/v1/api
    https://myurl.com/v2/api

I would negotiate versioning the API in the contract with URL versions. Only the new branch would be supported and older branches would have to be deprecated. Downstream third-party clients would have to be aware of this in their contract with our client. Deprecations and deletion of older branches of code would occur over the course of a year with multiple notificiations to the client and updates to their documentation (we would manage their technical API documentation and deliver it to them).