'use strict'

const mongoose	= require('mongoose');
const Schema 	= mongoose.Schema;

const product_schema = new Schema({
	name 		: String,
	price 		: { type: Number, default: 0},
	description : String,
	image		: String,
	stock		: { type: Number, default: 0},
});

module.exports = mongoose.model('Product', product_schema);