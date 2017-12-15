'use strict'

const mongoose	= require('mongoose');
const Schema 	= mongoose.Schema;

const user_schema = new Schema({
	name		: String,
	email		: {type: String, unique: true, lowercase:true},
	age 		: { type: Number, default: 0},
	adress		: String,
	country		: String,
	pass		: String,
	roll		: Number,
});


module.exports = mongoose.model('User',user_schema);