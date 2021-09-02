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
2. An explanation of why you would choose this particular method.
3. A unit test!

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
| user_id  | 
| metadata |
+----------+

+----------+
| user     |
+----------+
| id       | 
| metadata |
+----------+

Relations:
car belongs to user  
```
There are many ways to do this - feel free to google your options. We want to see:

1. Some kind of schema (e.g. sqldump, JSON)
2. Example of how the query would look
3. Why is this solution better than some alternative?


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

## Submitting your solution

Please submit your solution as a PR including some nice commits for challenge 1 and the rest in Markdown.

# Answers - Suzanne Wood

# 1. Deduplicate

To run tests:
npx elm-test
