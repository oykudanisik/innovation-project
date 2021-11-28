const mongoose = require('mongoose');
const Joi = require('joi');

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    moisture: {
        type: Number,
        required: true,
    }
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports.Plant = Plant;
