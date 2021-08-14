I would not recommend deploying the same build with runtime variables injected by Nginx on the front-end, as there is a XSS forgery risk by doing so: 

1. Create Dockerfile for Nginx server
  a. Configure substitution module
  b. Place variable substitution in React application index.html (Mocked out for our purposes)
  c. Introduce argument in Dockerfile passed to front-end Nginx through substition module.
2. Create Dockerfile for React minimized build (Webpack)
3. `cd react-server && docker build --tag react-server --build-arg API_BASE_URL=https://myurl.com .`
4. `docker run -it --rm -d -p 80:80 --name web react-server`

