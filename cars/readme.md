My car model should have 

available: {
            from: time_start,
            to: time_end
        },
reserved: [
    {
        from: time_start,
        to: time_end
    },
    ...
]

My query should look if there is any overlap between the reserved time
{
    reserved: {
        $not: {
            $elemMatch: {
                from: { $lte: start_time },
                to: { $gte: end_time }
            }
        }
    }
}