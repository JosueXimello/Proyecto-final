'use strict'

const mongoose	= require('mongoose');
const Schema 	= mongoose.Schema;

const buy_schema = new Schema({
	userId		: String,
	productname : String,
	tarjetan	: Number,
	fecha		: String,
	price		: Number,
	date		: Date,
});

module.exports = mongoose.model('Buy', buy_schema);