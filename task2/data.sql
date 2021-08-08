-- signature of users table
CREATE TABLE users (
       id int NOT NULL auto_increment,
       metadata varchar(15),
       PRIMARY KEY (id)
);

-- signature of cars table
CREATE TABLE cars (
      id int NOT NULL auto_increment,
      metadata varchar(15),
      user_id int,
      PRIMARY KEY (id)
);
ALTER TABLE cars ADD CONSTRAINT car_user_fkey FOREIGN KEY (user_id) REFERENCES users(id);

-- signature of bookings table
CREATE TABLE bookings (
      id int NOT NULL auto_increment,
      car_id int,
      customer_id int,
      PRIMARY KEY (id)
);
ALTER TABLE bookings
    ADD CONSTRAINT booking_user_fkey FOREIGN KEY (customer_id) REFERENCES users(id),
    ADD CONSTRAINT booking_car_fkey FOREIGN KEY (car_id) REFERENCES cars(id);

-- signature of cars availability table
CREATE TABLE cars_availability (
     id int NOT NULL auto_increment,
     car_id int,
     available_from datetime NOT NULL,
     available_to datetime NOT NULL,
     PRIMARY KEY (id)
);
ALTER TABLE cars_availability ADD CONSTRAINT cars_availability_car_fkey FOREIGN KEY (car_id) REFERENCES cars(id);



-- request to get free cars
SELECT c.id, a.available_from, a.available_to
    FROM cars AS c JOIN cars_availability AS a
    ON c.id = a.car_id
    WHERE a.available_from < '2021-08-09 09:14:55'
        AND a.available_to > '2021-08-10 09:14:55';
