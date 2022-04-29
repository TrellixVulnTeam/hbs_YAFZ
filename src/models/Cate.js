const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cate = new Schema({
    nameCate: String,
    imageCate: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
})

module.exports = mongoose.model('Cate',Cate)