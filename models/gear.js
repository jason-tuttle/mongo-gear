const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/geardb');

const gearSchema = new mongoose.Schema({
    make: {type: String, required: true },
    model: {type: String, required: true },
    type: String,
    purchasedNew: Boolean,
    properties: [],
    dateAdded: { type: Date, default: Date.now }
})

const Gear = mongoose.model('Gear', gearSchema);

mongoose.connection.close();

module.exports = Gear;
