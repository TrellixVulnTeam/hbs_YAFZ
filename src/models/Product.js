const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Product = new Schema({
    name: String,
    image: String,
    image2: String,
    hot: Boolean,
    price: Number,
    desc: String,
    number: Number,
    cate: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cate"
    },
    slug: { type: String, slug: 'name' , unique: true},
    createAt: {type: Date , default: Date.now}
})

module.exports = mongoose.model('Product',Product)
