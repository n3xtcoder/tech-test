## FrontOps
### There are many ways to switch API_BASE_URL variable.

I decided to use different build commands to set up API_BASE_URL.

1. add scripts to package.json
~~~yml
//package.json
    "scripts": {
    "start": "react-scripts start",
    "test": "react-scripts test",
    "build:staging": "env-cmd -f .env.staging npm run-script build",
    "build:production": "env-cmd -f .env.production npm run react-scripts build"
}
~~~

2. create 2 env files

~~~yml
//.env.production
  REACT_APP_API_URL = “https://n3xtcoder.org/api”
  REACT_APP_ENV = “production”
}
~~~
~~~yml
//.env.staging
  REACT_APP_API_URL = “https://n3xtcoder.org/staging/api”
  REACT_APP_ENV = “staging”
}
~~~

3. set up different build commands on the server
    * npm run build:staging
    * npm run build:production

If api_url can change, I would change it in env files
