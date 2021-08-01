const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Car = require('./models/cars')

const dbURI = `mongodb+srv://cars:cars!"§$@cluster0.58qos.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000, () => console.log("running")))
    .catch(err => console.log(err))


app.get("/add", (req, res) => {
    const car = new Car({
        car_id: 2,
        available: {
            from: 50,
            to: 200
        },
        reserved: [
            {
                from: 55,
                to: 70
            },
            {
                from: 120,
                to: 130
            }
        ]
    })
    car.save()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

// Possible Query
// {
//     $and: [
//         {
//             reserved: {
//                 $not: {
//                     $elemMatch: {
//                         from: { $lte: 2 },
//                         to: { $gte: 10 }
//                     }
//                 }
//             }

//         }, {
//             available: {
//                 from: { $lte: 2 },
//                 to: { $gte: 10 }
//             }
//         }
//     ]
// }


// {
//     reserved: {
//         $not: {
//             $elemMatch: {
//                 from: { $lte: 2 },
//                 to: { $gte: 10 }
//             }
//         }
//     }

// }