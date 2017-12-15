'use strict'


var date			= new Date();

const Product 		= require('../models/productSchema');
const Transaction 	= require('../models/transactionSchema');
const User 			= require('../models/userSchema');
const Buy 			= require('../models/buySchema');
 
//Functions to products----------------------------------------------------------------------------------------------------------
function getProduct(req,res){
		console.log('GET /music/product/:productId');

		let productId = req.params.productId;
		console.log(productId);

		Product.findById(productId, (err,productget) => {
			if(err){return res.status(500).send({message: `Error al realizar la peticion: ${err}`});}
			if(!productget){ return res.status(404).send({message: `El producto '${productId}' no existe`})}
			res.status(200).send({productget});

			//Section to store transaction
			postTransaction(`Consulta individual de producto`,productId);
		});
}

function getProducts(req,res){
		Product.find({}, (err,product) => {
			if(err){ return res.status(500).send({message: `Error al realizar la solicitud ${err}`});}
			if(!product){ return res.status(404).send({message: 'No hay productos en la base de datos'});}
			res.status(200).send({product});

			//Section to store transaction
			postTransaction(`Consulta global de productos`,0);
		});
}

function postProduct(req,res){
		console.log('POST /music/product/add');
		console.log(req.body);

		let product = new Product();
			product.name		 = req.body.name;
			product.price 		 = req.body.price;
			product.description  = req.body.description;
			product.image		 = req.body.image;
			product.stock		 = req.body.stock;
		product.save((err,productstored) => {
			if(err) res.status(500).send({message: `Error al almacenar el objeto en la base de datos ${err}`});

			res.status(200).send({productstored});

			//Section to store transaction
			let pid = productstored._id;
			postTransaction(`Elemento guardado`,pid);
		});
}

function updateProduct(req,res){
		let productId = req.params.productId;
		let update = req.body;

		console.log(update);
		Product.findByIdAndUpdate(productId,update,(err,productUp) => {
			if(err) return res.status(500).send({message: `Error al actualiar el producto ${err}`})
			if(!productUp){ return res.status(404).send({message: 'No se encontro el producto'});}

			res.status(200).send({productUp});
			console.log(productUp);

			postTransaction(`Elemento actualizado`,productId);
		});
}

function deleteProduct(req,res){
		let productId = req.params.productId;

		Product.findById(productId,(err,product) => {
			let n = product.name;

			if(err) return res.status(500).send({ message: `Error al realizar la peticion de borrar ${err}`});

			product.remove(err => {
				if(err) return res.status(500).send({ message: `Error al realizar la peticion de borrar ${err}`});
				res.status(200).send({message: `El producto ${n} ha sido eliminado`});

				postTransaction(`Elemento eliminado`,productId);
			});
		});
}

//Functions to store movements of buy------------------------------------------------------------------------------------------
function buyProduct(req,res){
		console.log('POST /music/product/buy');
		console.log(req.body);

		let bproduct = new Buy();
			bproduct.date		 = req.body.date;
			bproduct.userId 	 = req.body.userid;
			bproduct.productname = req.body.productname;
			bproduct.price		 = req.body.price;
		bproduct.save((err,productstored) => {
			if(err) res.status(500).send({message: `Error al almacenar el objeto en la base de datos ${err}`});

			res.status(200).send({productstored});

			//Section to store transaction
			let pid = productstored._id;
			postTransaction(`Compra de producto`,pid);
		});
}

function purchaseTransactions(req,res){

		console.log("Purchase transactios");
		Buy.find({}, (err,trans) => {
			if(err){ return res.status(500).send({message: `Error al realizar la solicitud ${err}`});}
			if(!trans){ return res.status(404).send({message: 'No hay productos en la base de datos'});}
			res.status(200).send({trans});
		});
}

//Function to transactions--------------------------------------------------------------------------------------------------------
function getTransaction(req,res){
		let transId = req.params.transactionId;

		Transaction.findById(transId, (err,transaction) => {
			if(err){return res.status(500).send({message: `Error al realizar la peticion: ${err}`});}
			if(!transaction){ return res.status(404).send({message: `La transaccion '${transId}' no existe`})}
			res.status(200).send({transaction});
		});
}

function getTransactions(req,res){
		Transaction.find({}, (err,trans) => {
			if(err){ return res.status(500).send({message: `Error al realizar la solicitud ${err}`});}
			if(!trans){ return res.status(404).send({message: 'No hay productos en la base de datos'});}
			res.status(200).send({trans});
		});
}



function postTransaction(description,productId){
			//Section to store transaction
				let trans = new Transaction();
				trans.description 	= description +` ID: ${productId}`;
				trans.date			= date;
			trans.save((err,transStored) => {
				if(err) return console.log(`Error al almacenar la transaccion ${err}`);
				if(transStored){console.log('Transaccièon almacenada'); console.log(transStored.description)}
			});
}

//Function to users--------------------------------------------------------------------------------------------------------------
function getUser(req,res){
		console.log('GET /music/user/:userId');

		let userId = req.params.userId;
		console.log(productId);

		User.findById(userId, (err,userget) => {
			if(err){return res.status(500).send({message: `Error al realizar la peticion: ${err}`});}
			if(!userget){ return res.status(404).send({message: `El usuario '${userId}' no existe`})}
			res.status(200).send({userget});

			//Section to store transaction
			postTransaction(`Consulta individual de Usuario`,userId);
		});
}

function getUsers(req,res){
		User.find({}, (err,user) => {
			if(err){ return res.status(500).send({message: `Error al realizar la solicitud ${err}`});}
			if(!user){ return res.status(404).send({message: 'No hay usuarios en la base de datos'});}
			res.status(200).send({user});

			//Section to store transaction
			postTransaction(`Consulta global de usuarios`,0);
		});
}

function postUser(req,res){
		console.log('POST /music/user');
		console.log(req.body);

		let user = new User();
				user.name		=req.body.name;
				user.email		=req.body.email;
				user.age 		=req.body.age;
				user.adress		=req.body.adress;
				user.country	=req.body.country;
				user.pass		=req.body.pass
				user.roll		=req.body.roll
		user.save((err,userstored) => {
			if(err) res.status(500).send({message: `Error al almacenar el usuario en la base de datos ${err}`});

			res.status(200).send({userstored});

			//Section to store transaction
			let pid = userstored._id;
			postTransaction(`Usuario guardado`,pid);
		});
}

function verUser(req,res){
		console.log('POST /music/user/ver');
		console.log(req.body);

		let name = req.body.name;
		let pass = req.body.pass;
		User.findOne({name:name},(err,userver) => {
			if(err) return res.status(500).send({message: `Error al ejecutar la peticion ${err}`});
			if(!userver){ return res.status(404).send({message: `Error: Usuario incorrecto`});}

			if(pass == userver.pass){
					res.status(200).send({userver});
					console.log(`Usuario ${name} conectado`);
				}

			//Section to store transaction
			let pid = userver._id;
			postTransaction(`Usuario conectado`,pid);
		});
}

function outUser(req,res){
		console.log('POST /music/user/out');
		console.log(req.body.product);

		let name = req.body.product;
		User.findOne({name:name},(err,userver) => {
			if(err) return res.status(500).send({message: `Error al ejecutar la peticion ${err}`});
			if(!userver){ return res.status(404).send({message: `Error: Usuario incorrecto`});}

					res.status(200).send({name});
					console.log(`Usuario ${name} desconectado`);

			//Section to store transaction
			let pid = userver._id;
			postTransaction(`Usuario desconectado`,pid);
		});
}

module.exports = {

	getProduct,
	getProducts,
	postProduct,
	updateProduct,
	deleteProduct,
	buyProduct,
	purchaseTransactions,
	getTransaction,
	getTransactions,
	getUser,
	getUsers,
	postUser,
	verUser,
	outUser,
}