var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    title: String,
    price: Number,
    author: String,
    publisher: String,
});
module.exports = mongoose.model('Product', ProductSchema);