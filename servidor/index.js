const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors")

// Creamos el servidor
const app = express();

// Conectamos a la bd
conectarDB();

app.use(cors());

app.use(express.json());

app.use('/api/productos', require('./routes/producto'))


app.listen(4300, () => {
    console.log('El servidor esta corriendo en el puerto 4300 sin problemas');
})