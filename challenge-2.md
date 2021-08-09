+-------------+
| cars        |
+-------------+
| car_id      |
| user_id     | 
| car_data    |
+-------------+

+-------------+
| booking     |
+-------------+
| car_id      | 
| user_id     | 
| datetime    |
| available   | 
+-------------+

+-------------+
| users       |
+-------------+
| user_id     | 
| user_type   |
+-------------+



/*
Notes:

I've included the "users" table to indicate how we might differentiate between a lender and a borrower, using "user_type".

// all ids are integers
// "cars.car_data" represents multiple fields covering car details
// "booking.user_id" shows who was/is/will be in possession of a car for the given time period "datetime"
// location has been left out for simplicity of the model
// "users.user_type" indicates whether user is a "lender" or "borrower"
// "booking.available" is boolean: 0 = car is booked or unavailable, 1 = car is available to book


Scenario - lender wants to use car:

When the lender wants to use their car over a given time period, they select this period and the car is marked as unavailable ("booking.available" = 0) along with any bookings by borrowers.


MySQL query for the following scenario:

"A borrower selects a date and time period of 13:00 09/08/2021 - 20:00 13/08/21 (DD/MM/YYYY). They can now view all available cars"

------------

SELECT cars.car_id, cars.car_data
FROM cars
JOIN (SELECT car_id
      FROM booking
      WHERE 'datetime' >= '2021-08-09 13:00:00'
        AND 'datetime' < '2021-08-13 20:00:00'
        AND available = 0
      GROUP BY car_id
      HAVING COUNT(*) = TIMEDIFF ('2021-08-13 20:00:00', '2021-08-09 13:00:00')) availability
  ON availability.car_id = cars.car_id;
      
*/