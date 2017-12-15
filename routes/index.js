'use strict'

const express = require('express');
const productCtrl =  require('../controllers/product');
const api = express.Router();

//verb to index page "PRODUCTS"--------------------------------------------------------------------------------
	//Get all products
	api.get('/product',productCtrl.getProducts);
	//Get unique
	api.get('/product/:productId',productCtrl.getProduct);
	//Create product
	api.post('/product/add',productCtrl.postProduct);
	//Update product
	api.put('/product/edit/:productId',productCtrl.updateProduct);
	//Product buy
	api.post('/product/buy',productCtrl.buyProduct);
	//Delete product 
	api.delete('/product/:productId',productCtrl.deleteProduct);

//verb to index page "USERS"--------------------------------------------------------------------------------
	//Get all users
	api.get('/user',productCtrl.getUsers);
	//Get unique user
	api.get('/user/:userId',productCtrl.getUser);
	//Create user
	api.post('/user',productCtrl.postUser);
	//Veryfie User
	api.post('/user/ver',productCtrl.verUser);
	//Desconectar User
	api.post('/user/out',productCtrl.outUser);

//verb to index page "Transaction"--------------------------------------------------------------------------------
	//Get all transactions
	api.get('/transaction',productCtrl.getTransactions);
	//Get unique transaction
	api.get('/transaction/:transactionId',productCtrl.getTransaction);
	//Get all purchase transactions
	api.get('/purchase',productCtrl.purchaseTransactions);


module.exports = api;