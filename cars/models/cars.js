const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
    car_id: {
        type: Number,
        required: true
    },
    available: {
        from: {
            type: Number,
            required: true
        },
        to: {
            type: Number,
            required: true
        }
    },
    reserved: {
        type: Array,
        required: false
    }
}, { timestamps: true })

const Car = mongoose.model('car', carSchema)
module.exports = Car