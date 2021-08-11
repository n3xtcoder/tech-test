# 2. Booking system data schema

Data model used is as follows:

```
+----------+
| lender   |
+----------+
| id       | 
| name     |
+----------+

+----------+
| borrower |
+----------+
| id       | 
| name     |
+----------+

+----------+
| car      |
+----------+
| id       |
| lender_id|
+----------+

+-------------+
| booking     |
+-------------+
| id          | 
| car_id      |
| borrower_id |
| time        |
| date        |
| available   |
+-------------+

```

## Why is this solution better than some alternative?

We went for a relational database implementation here because the type of data seems to be well defined, no
complex structure of the data, sort of standard types and clear relations between the entities. We are applying
normalization practices on the database to help guarantee the integrity of the data, e.g., doing the proper
abstraction to define foreign columns, simplifying the dependencies with these foreign keys, and taking care
of redundant entries that can be minimized.

We could move to a NoSQL (non-relational) database in case that more features involving higher traffic, more
real-time and more complexity of the data are present, or for instance, if dealing with big data purposes.