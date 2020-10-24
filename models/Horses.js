const mongoose = require('mongoose');
const { LabelStringPairSchema, LabelNumberPairSchema } = require('./_schemas')

const HorseSchema = new mongoose.Schema({
    index: Number,
    owner: String,
    who: [LabelStringPairSchema],
    about: [LabelStringPairSchema],
    stats: [LabelNumberPairSchema]
})

const Horses = mongoose.model("Horse", HorseSchema);

module.exports = Horses