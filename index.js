//const port='https://backend-portafolio-nodejs.herokuapp.com/';

//mongoose.connect('mongodb://root:root@ds259154.mlab.com:59154/portafoliodb')

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root1234@ds259154.mlab.com:59154/portafoliodb')
        .then(() => {
        	console.log("Conexión a la base de datos establecida satisfactoriamente...");
			console.log(port);
			
        	// Creacion del servidor
        	app.listen(process.env.PORT || 3700, () => {
        		console.log("Servidor corriendo correctamente en la url: localhost:3700");
        	});

        })
        .catch(err => console.log(err));