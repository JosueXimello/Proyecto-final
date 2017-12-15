

(function(){
	var app = angular.module('app', ['ngRoute']);

	//*-*-*-*-*-*-*-*-*-controladore StoreController-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

	app.controller('StoreController',['$http', function($http){
		var store = this;
		var url = 'http://localhost:3001/music/';
		store.p = ({
			name: "",
			price: 0,
			discription: 0,
			foto: "",
			stock: 0,
			
			
		});

		store.user = ({
			name		: "",
			email		: "",
			age			: 0 ,
			adress		: "",
			country		: "",
			pass		: "",
			roll		: 3,
		});

		//store.compra:  userId, productname, tarjetan, fecha, price, date

		//This var is to show an div that contain an unique product
		store.userroll = 0;					//Rolls: 1 = Supervisor, 2 = Admin , 3 = Normal
		store.userconnect = 0;

		//------------------------------Products--------------------------------------
		store.allProducts = function(){
			$http.get(url+"product").then(function success(response){
				console.log(response.data.product);
				store.products = response.data.product;
				console.log(store.products);
			});
		}

		store.addProduct = function(product){
			console.log(product);
			$http.post(url+'product/add', product).
			then(function success(response){
				console.log(response);
			},
			function err(err){
				console.log(err);
			})
			
		}

		store.deleteProduct = function(id){
			console.log("Eliminando: "+id);
			$http.delete(url+"product/" + id)
			.then(function success(response){
				console.log(`El producto con el ID ${id} se ha eliminado`);
			}, function err(err){
				console.log(`El producto no se ha eliminado ERR ${err}`);
			})
		}


		store.getUniqueProduct = function(id){
			console.log("Me picaron soy get");
			$http.get(url+"product/" + id).then(function success(response){

			console.log(response);
			store.product = response.data.productget;

		});
		}

		store.updateProduct = function(id,revProduct){

			console.log(revProduct);
			console.log(id);

			$http.put(url+'product/edit/'+id,{revProduct})
			.then(function success(response){
				console.log(response);
				store.mostrarModal;

			},
			function err(err){console.log(`ho ho algo salio mal error ${err}`);}
			);
		}

		store.buyProduct = function(){
			var f = new Date();

			console.log(store.veruser._id);
			store.compra.userid = store.veruser._id;
			store.compra.productname = store.product.name;
			store.compra.date = f;

			let product = store.compra;

			console.log(product);

			$http.post(url+'product/buy', product).
			then(function success(response){
				console.log(response);
			},
			function err(err){
				console.log(err);
			})
		}
		//--------------------------------------------Users--------------------------------------------
		store.valUser = function(product){
			console.log(product);
			$http.post(url+'user/ver', product).
			then(function success(response){
				console.log(response);
				store.veruser = response.data.userver;
				store.userconnect = 1;
				store.userroll = store.veruser.roll;

			},
			function err(err){
				console.log(err);
			})	
		}

		store.outUser = function(product){
			console.log(product);
			$http.post(url+'user/out', {product}).
			then(function success(response){
				console.log(response);
				store.userconnect = 0;
				store.userroll = 0

			},
			function err(err){
				console.log(err);
			})	
		}

		store.createUser = function(product){
			console.log(product);
			$http.post(url+'user', product).
			then(function success(response){
				console.log(response);
				store.veruser = response.data.userstored;
				store.userconnect = 1;
				store.userroll = store.veruser.roll;

			},
			function err(err){
				console.log(err);
			})	
		};

		//--------------------------------------Transaction-----------------------------------------
		store.allTransactions = function(){
			console.log("Obteniendo transacciones");
			$http.get(url+"transaction").then(function success(response){
				console.log(response.data.trans);
				store.transaction = response.data.trans;
				console.log(store.transaction);
			});
		}

		store.purchaseTransactions = function(){
			console.log(">Purchase Transaction");
			$http.get(url+"purchase").then(function success(response){
				store.ptransaction = response.data.trans;
				console.log(store.ptransaction);
			});
		}


	}]);
   

})();