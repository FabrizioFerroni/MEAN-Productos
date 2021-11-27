const { findOneAndRemove } = require("../models/Producto");
const Producto = require("../models/Producto");

exports.crearProducto = async (req, res) => {
    try {
        let producto;

        // Creamos el producto
        producto = new Producto(req.body);
        await producto.save()
        res.send(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res) =>{
    try {
        const productos = await Producto.find();
        res.json(productos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio} = req.body;
        let productoedit = await Producto.findById(req.params.id);

        if(!productoedit){
            res.status(404).json({msg: 'No existe el producto buscado'});
        }

        productoedit.nombre = nombre;
        productoedit.categoria = categoria;
        productoedit.ubicacion = ubicacion;
        productoedit.precio = precio;

        productoedit = await Producto.findOneAndUpdate({_id: req.params.id}, productoedit, {new: true});
        res.json(productoedit);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        let productoobt = await Producto.findById(req.params.id);

        if(!productoobt){
            res.status(404).json({msg: 'No existe el producto buscado'});
        }

        res.json(productoobt);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        let productodel = await Producto.findById(req.params.id);

        if(!productodel){
            res.status(404).json({msg: 'No existe el producto buscado'});
        }
        await Producto.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Producto eliminado con éxito'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}