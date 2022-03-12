const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cars4sale');

var carSchema = new mongoose.Schema({
    cid: { type: Number, unique: true },
    year: { type: Number },
    make: { type: String },
    model: { type: String },
    miles: { type: Number },
    price: { type: Number },
    dealer_id: { type: String },
});

module.exports = mongoose.model('Car', carSchema);
