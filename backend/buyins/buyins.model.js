const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BuyIn = new Schema({
    stock_id: {
        type: String,
        required: true
    },
    buyInPrice: {
        type: Number,
        required: true
    },
    buyInDate: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('BuyIn', BuyIn);
