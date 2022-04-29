const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Slider = new Schema({
    url: String,
    nameSlider: String,
    // active: Number,
})

module.exports = mongoose.model('Slider',Slider)