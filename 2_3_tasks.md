## 2. Booking system data schema

### 1. SQL dump

~~~~sql
--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `metadata` text NOT NULL,
  `is_lender` tinyint(1) NOT NULL DEFAULT '0',
  `is_borrower` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
--
-- Table structure for table `lenders_cars`
--
CREATE TABLE `lenders_cars` (
  `id` int(11) NOT NULL,
  `lender_id` int(11) NOT NULL,
  `metadata` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
--
-- Table structure for table `lenders_cars_availability`
--
CREATE TABLE `lenders_cars_availability` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `available_from` datetime NOT NULL,
  `available_to` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
--
-- Table structure for table `bookings`
--
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `borrower_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `booking_from` datetime NOT NULL,
  `booking_to` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lenders_cars`
--
ALTER TABLE `lenders_cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_lenderscars_users_lenderid` (`lender_id`);

--
-- Indexes for table `lenders_cars_availability`
--
ALTER TABLE `lenders_cars_availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_lenderscarsavailability_lenderscars_carid` (`car_id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bookings_users_borrowerid` (`borrower_id`),
  ADD KEY `fk_bookings_lenderscars_carid` (`car_id`);

--
-- AUTO_INCREMENT for dumped tables
--

-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `lenders_cars`
--
ALTER TABLE `lenders_cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `lenders_cars_availability`
--
ALTER TABLE `lenders_cars_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lenders_cars`
--
ALTER TABLE `lenders_cars`
  ADD CONSTRAINT `fk_lenderscars_users_lenderid` FOREIGN KEY (`lender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `lenders_cars_availability`
--
ALTER TABLE `lenders_cars_availability`
  ADD CONSTRAINT `fk_lenderscarsavailability_lenderscars_carid` FOREIGN KEY (`car_id`) REFERENCES `lenders_cars` (`id`);

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_lenderscars_carid` FOREIGN KEY (`car_id`) REFERENCES `lenders_cars` (`id`),
  ADD CONSTRAINT `fk_bookings_users_borrowerid` FOREIGN KEY (`borrower_id`) REFERENCES `users` (`id`);
~~~~

### 2. Query to show what cars are available at a given time (even if some bookings have already been made):

~~~~sql
SELECT
	`lenders_cars_availability`.*,
  `lenders_cars`.`lender_id`
FROM 
	`lenders_cars_availability`
LEFT JOIN (
	SELECT 
    	`bookings`.`car_id`, 
    	COUNT(*) AS `quantity`
	FROM 
    	`bookings`
    WHERE
    	`bookings`.`booking_from` <= "${bookingFrom}" AND
	    `bookings`.`booking_to` >= "${bookingTo}"
	GROUP BY 
    	`bookings`.`car_id`
) `bookings_info` 
ON 
	`bookings_info`.`car_id` = `lenders_cars_availability`.`car_id`
LEFT JOIN
	`lenders_cars`
ON
	`lenders_cars`.`id` = `lenders_cars_availability`.`car_id`
WHERE
	`lenders_cars_availability`.`available_from` <= "${bookingFrom}" AND
  `lenders_cars_availability`.`available_to` >= "${bookingTo}" AND
  COALESCE(`bookings_info`.`quantity`, 0) = 0 AND
  `lenders_cars`.`lender_id` <> ${currentUser}

*
bookingFrom - start of the period for availability check
bookingTo - end of the period for availability check
currentUser - current user's id (to not allow user book his own cars)
~~~~

### 3. SQL DBs are good for applications that require multi-row transactions, where data is primarily structured such as an accounting or booking systems. Each row in a SQL database is a distinct entity (e.g. a customer), and each column is an attribute that describes that entity.

## 3. FrontOps
### 1. To deploy production and staging environments I've decided to use GitHub Actions and host the app on Heroku (the same approach could be used for any other hosting provider).
1. I've created two instances (apps) on Heroku for staging and production.
2. For publishing projects on Heroku was necessary to set environment variables in GitHub Repo (secrets):
    * HEROKU_API_KEY 
    * HEROKU_EMAIL - user's email
    * HEROKU_APP_PRODUCTION_NAME - name of the production instance in Heroku
    * HEROKU_APP_STAGING_NAME - name of the staging instance in Heroku
3. I've added a GitHub Action on 'push to master' event to update both deployments:
~~~yml
name: Production and staging deployment of the app

on:
  push:
    branches: [ main ]

jobs:
  build-publish:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v2
      - name: Deploy Staging to Heroku 
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: ${{ secrets.HEROKU_APP_STAGING_NAME }}
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
      - name: Deploy Production to Heroku 
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: ${{ secrets.HEROKU_APP_PRODUCTION_NAME }}
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
~~~

### 2. A list of steps to take to change the FQDN of the API (API_BASE_URL) for production or staging:
1. Set environment variable with correct API_BASE_URL on each Heroku instance (staging, production)
2. Then you can access this variable in your app. For example in Nuxt.js: 
~~~javascript
// nuxt.config.js
export default {
  env: {
    apiBaseURL: process.env.API_BASE_URL || 'http://n3xtcoder.org/api/default'
  }
}

// anyFile.vue
console.log( process.env.apiBaseURL );
~~~
### 3. How would you handle new versions of the API?
1. If we are talking about the Front-End side, than we need to change the environment variable API_BASE_URL.
2. If we are talking about the updating the API, we should try to avoid create breaking changes. 
Try to add new data on top of existing. If you need to make a breaking change, you should do it in a new version of an API, 
so the old clients can still use the previous version. There are multiple types for passing version to API (URI path, Query params, Header), 
each of them has pros and cons. 
