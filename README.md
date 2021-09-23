# PEBKAC - The N3XTCODER fullstack developer challenge

## 1. Deduplication algorithm

Using a language of your choice, implement a function to deduplicate a list of words,
so that, the function receives the list as an argument and returns the list without the
duplicates. Here's an example in Javascript

```js
const wordList = ['not', 'a', 'pheasant', 'plucker', 'but', 'a', 'pheasant', "plucker's", 'son']

console.log(deduplicate(wordList))

[ 'not', 'a', 'pheasant', 'plucker', 'but', 'plucker\'s', 'son' ]
```
NB: the order of the output list does not matter.

There are many ways to do this - feel free to google your options. We want to see:

1. The function in syntactically correct (and readable) code.
    1. Three methods in ``app.component.ts`` file
2. An explanation of why you would choose this particular method.
    1. ``deduplicateMethod1()`` is a preferred one, (the most clean as well)
3. A unit test!
    1. Available in ``app.component.spec.ts``

Results in ``/tech-test/deduplication-app`` which is an Angular v12 app with Unit-tests

## 2. Booking system data schema

Imagine you are implementing a booking system for a peer2peer car share.

User A, "Lender" needs to specify when their car is available, while user B, "Borrower"
needs to be able to reserve the car at their preferred time. A car can only be lent to
one person at a time.

What data schema would you need to store in order to support these use cases? Feel free
to demonstrate a solution in your favourite datastore. The solution should support a simple
query to show what cars are available at a given time (even if some bookings have already
been made). You don't have to do it relational schema, but you have to show how the query
would look.

Here's an example in psuedocode to get you started:

```
+----------+
| car      |
+----------+
| id       |
| metadata |
+----------+

+----------+
| user     |
+----------+
| id       | 
| metadata |
+----------+

Relations:
+---------------------+
| car_belongs_to_user |
+---------------------+
| id                  | 
| user_id             | (fk user_id -> user.id)
| car_id              | (fk car_id -> car.id)
| bookingStartDate    |
| bookingEndDate      |
| status              | ('BOOKED', 'CANCELLED', 'COMPLETED')
| metadata            |
+---------------------+ 

CREATE TABLE IF NOT EXISTS car (
  id uuid NOT NULL PRIMARY KEY,
  metadata JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id uuid NOT NULL PRIMARY KEY,
  metadata JSONB NOT NULL
);

CREATE TYPE BOOKING_STATUS AS ENUM ('BOOKED', 'CANCELLED', 'COMPLETED');

CREATE TABLE IF NOT EXISTS car_belongs_to_user (
  id uuid NOT NULL PRIMARY KEY,
  user_id uuid NOT NULL,
  car_id uuid NOT NULL,
  bookingStartDate date NOT NULL,
  bookingEndDate date NOT NULL,
  status BOOKING_STATUS NOT NULL,
  metadata JSONB NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (car_id) REFERENCES car(id)
);

As input user would have to provide 2 dates (bookingStartDate and bookingEndDate).
Prerequisite that must be fulfilled: 'bookingEndDate' > 'bookingStartDate' 
Example query:

SELECT * FROM car as c
WHERE c.id NOT IN (
		SELECT cbtu.car_id from car_belongs_to_user cbtu
		where 	$INPUT_START_DATE <= cbtu.bookingEndDate
		and  	$INPUT_END_DATE >= cbtu.bookingStartDate
		and 	cbtu.status = 'BOOKED'
)

```
There are many ways to do this - feel free to google your options. We want to see:

1. Some kind of schema (e.g. sqldump, JSON)
    1. ``See above DB table schema``
2. Example of how the query would look
    1. ``See above example query``
3. Why is this solution better than some alternative?
    1. ``I have adjusted the given schema because then we don't need to edit "CAR" entity.
       This way we can also keep track which cars are the most popular, which bookings were successfully completed and
       how long they have lasted, also which were cancelled.
       It is always good idea to keep details of relation outside of their entities.
       Also this relationship could be considered as Many:Many``

## 3. FrontOps

You have a frontend app written in ReactJS and you are preparing it for production. The app
needs to call an API server with a FQDN configured in the variable API_BASE_URL. There
will be a production deployment and a staging deployment
for demos/testing. How would you deploy the frontend so that the same build (minified JS, CSS
and HTML) can be used in production and staging deployments?

We want to see:

1. A description of how your implementtion would work, e.g. a docker file or a deployment config
2. A list of steps you need to take to change the FQDN of the API (API_BASE_URL) for production or staging
3. How would you handle new versions of the API?

Answers:
1.
    1. In best case scenario these variables should be set on the SPA build time within CI/CD pipeline. Based on the environment
       where the pipeline/job is executed app could be build under specific predefined config and use the proper set of environment
       variables.
    2. In your case study, it's required to be added after the app has already been built and (app is bundled, code minified and so on ...)
       In such case,  React has built-in environment variables that are accessible during the runtime.
       Here is an interesting link on how custom env variables could be introduced to the React app (https://create-react-app.dev/docs/adding-custom-environment-variables/)
    3. In the markup or JS files such variable is accessible via the following: "process.env.NODE_ENV"
    4. Additionally, using react-scripts@0.2.3 or higher will let your React app consume environment variables defined locally in .env file. Those variables need to be prefixed with "REACT_APP_"

2.
    1. Create .env file if not existing
    2. Add environment variables that are needed (e.g. API_BASE_URL_STAGING, API_BASE_URL_PROD)
    3. Check on which environment the app is running with
        1. const baseApiUrl = process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL_PROD : API_BASE_URL_STAGING
3. It depends, API should use semantic versioning as in here (https://semver.org/) where MINOR and PATCH versions should not have a major impact on the application.
   Each release should have it's list of release notes so API consumers are aware of possible risks/changes after update.
   A new API version should still offer backward-compatibility, but mark certain parts as deprecated which will be removed in one of the next versions
   The API version could be reflected in the URL looking something like this:
    1. https://n3xtcoder.org/api/v1.0.0/ (initial release)
    2. https://n3xtcoder.org/api/v1.0.1/ (patch release)
    3. https://n3xtcoder.org/api/v1.2.4/ (minor release)
    4. https://n3xtcoder.org/api/v2.0.0/ (major release that could have big impact on the app usage - still offering support for v1.x.x features)4
    5. https://n3xtcoder.org/api/v3.0.0/ (another major release that removed deprecated parts of code - this will now require a certain action/refactoring on the side of API consumers)

## Submitting your solution

Please submit your solution as a PR including some nice commits for challenge 1 and the rest in Markdown.
