const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: 1,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);
const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;
