const mongoose = require('mongoose-schema-jsonschema')();

const { Schema } = mongoose;

const CarSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  year: { type: Number, required: true },
  model: { type: String, required: true },
  availability: [{ type: Schema.Types.ObjectId, required: true, ref: 'Schedule' }],
  bookings: [{ type: Schema.Types.ObjectId, required: true, ref: 'Schedule' }],
});

const UserSchema = new Schema({
    id: { type: String, required: true },
    lenderCar: [{type: Schema.Types.ObjectId, required: false, ref: 'Car' }],
    borrowedCars: [{type: Schema.Types.ObjectId, required: false, ref: 'Car' }]
  });

const ScheduleSchema = new Schema({
    year: { type: Number, required: true }, // added for easy queries and quicker indexing
    month: { type: String, required: true }, // added for easy queries and quicker indexing
    hours: [{ type: Schema.Types.ObjectId, required: true }], // Note, array of hourly as multiple reservations possible
    type: { type: String, enum: ['Car', 'User']},
    carId: { type: Schema.Types.ObjectId, required: true, ref: 'Car' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

const IntervalSchema = new Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true}
});

// *** Use cases ***
// User A: "Lender" needs to specify when car available
// 1) User fetches list of cars on profile
// const car = (await db.user.populate('cars').find({})).cars[2]
// 2) Selects a car to post schedule to
// car.availability = car.availability.push({year: 2021, month: 10, hours: {start: new Date(some interval for day), end: new Date(some interval for day)}}) 
// car.save()

// User B: "Borrower" needs to specify when 
// 1) User queries cars within availability 
// const cars = await db.cars.find({availability: {year: 2021, month: 10, hours: {$gt: new Date(some interval), $lt: new Date(some interval)}}});
// 2) Display the cars returned within that date range but the UI blocks off what is already booked for the range 
// 3) A user books one of the slots that is available. 
// db.cars[5].bookings = db.cars[5].bookings.push({year: 2021, month: 10, hours: {start: new Date(some interval for day), end: new Date(some interval for day)}})
// db.cars[5].save()