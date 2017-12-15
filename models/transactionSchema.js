'use strict'

const mongoose	= require('mongoose');
const Schema 	= mongoose.Schema;

const transaction_schema = new Schema({
	description	: String,
	date 		: Date,
});

module.exports = mongoose.model('Transaction', transaction_schema);