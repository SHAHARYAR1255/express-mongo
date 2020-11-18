const mongoose = require('mongoose')
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const promoSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    label:{
        type: String,
        default: ""
    },
    price:{
        type: Currency,
        required: true ,
        min: 0
    },
    description:{
        type: String,
        default: true
    },
    featured:{
        type: Boolean,
        required: false
    }
});

const Promo = mongoose.model('promo', promoSchema);

module.exports= Promo