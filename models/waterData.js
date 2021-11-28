const mongoose = require('mongoose');
const Joi = require('joi');

const waterDataSchema = new mongoose.Schema({
    plantId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
});

const waterData = mongoose.model('waterData', waterDataSchema);
module.exports.waterData = waterData;
