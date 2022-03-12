import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/cars4sale');

var carSchema = new mongooseSchema({
    cid: Number, unique,
    year: Number,
    make: String,
    model: String,
    miles: Number,
    price: Number,
    dealer_id: String,
});

module.exports = mongoose.model('Cars', carSchema);
