import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import { findAll, findById, createProd } from "../db/actions/productosActions.js"

const router = Router()


//GET
router.get('/all', async (req, res) => {
    try {
        const productos = await findAll();

        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json('Error al leer los productos')
    }
})


router.get('/:productId', async (req, res) => {
  const producto_id = req.params.productId;
  try {
    const producto = await findById(producto_id);

    if (producto) {
      res.status(200).json(producto); 
    } else {
      res.status(404).json('No se encontró el producto solicitado');
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json('Error interno');
  }
});


//POST
router.post('/nuevo', async (req, res) => {
    const nuevoProducto = {
        title: req.body.nombre,
        description: req.body.desc,
        price: req.body.precio,
        img: req.body.imagen,
        Category: req.body.category
    }

    //Body de Postman
    /* {
        "nombre": "nuevoProducto",
        "desc": "para leer",
        "precio": "$ 5300",
        "imagen": "nuevoLibro.jpg",
        "category": "libro"
    } */

    try {
        const productoCreado = await createProd(nuevoProducto);
        res.status(200).json({
            mensaje: 'Producto agregado!',
            producto: productoCreado
        });

    } catch (error) {
        res.status(500).json('Error interno')
    }
})


export default router