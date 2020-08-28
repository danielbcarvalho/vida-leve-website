const mongoose = require('mongoose')

//POSTAGE MODEL CONFIG
const vidaLeveSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    category: String,
    created: { type: Date, default: Date.now }
})
//schema index for search, every objects gets 'text'
vidaLeveSchema.index({'$**': 'text'})

module.exports = mongoose.model("Postage", vidaLeveSchema)