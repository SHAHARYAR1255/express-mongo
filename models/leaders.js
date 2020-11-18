const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LeaderSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    abbr:{
        type: String,
        required: true
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

const Leader = mongoose.model('Leader', LeaderSchema);

module.exports= Leader