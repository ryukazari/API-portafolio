const mongoose = require('mongoose');
const app = require ('./app');
const port = process.env.PORT || 3700;
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Portafolio')
    .then(()=>{
        console.log("SUCCESSFUL CONNECTION");

        //Creación del Servidor
        app.listen(port,()=>{
            console.log("SERVER RUNNING, ${app.get('port')}");
        })
    })
    .catch(err => console.log(err));