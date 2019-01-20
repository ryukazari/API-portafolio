var express = require('express');
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
var app = express();

const port = process.env.PORT || "0.0.0.0";

var project_routes = require('./routes/project');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.use('/api', project_routes);

app.listen(port,()=>{
	console.log("Server on: "+port);
	
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root1234@ds259154.mlab.com:59154/portafoliodb')
        .then(() => {
			console.log("Conexión a la base de datos establecida satisfactoriamente...");
        })
        .catch(err => console.log(err));