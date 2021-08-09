+-------------+
| cars        |
+-------------+
| car_id      |
| user_id     | 
| car_data    |
+-------------+

+-------------+
| users       |
+-------------+
| user_id     | 
| user_type   |
+-------------+

+-------------+
| booking     |
+-------------+
| car_id      | 
| user_id     | 
| datetime    |
| booked      | 
+-------------+

// all ids are integers
// "car_data" represents several fields covering car details
// location has been left out for simplicity of the model
// user_type indicates whether user is a lender or borrower