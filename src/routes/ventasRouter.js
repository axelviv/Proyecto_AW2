import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import { get_user_byId } from '../utils/usersUtil.js'
import { verifyToken } from "../utils/middleware.js"

const router = Router()

// //JSONS
// const fileVentas = await readFile('./src/data/ventas.json', 'utf-8')
// const ventas = JSON.parse(fileVentas)


//POST
router.post('/nueva', async (req, res) => {
    
    const nuevaVenta = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!await verifyToken(token)) {
    return res.status(400).json({ status: false });
  }
    
    try {     

        const fileVentas = await readFile('./src/data/ventas.json', 'utf-8');
        const ventas = JSON.parse(fileVentas);

        //Generar un id y registrar la fecha exacta de la compra
        nuevaVenta.id = Date.now();
        nuevaVenta.fecha = new Date().toISOString();

        //Agregar venta al array
        ventas.push(nuevaVenta);

        //Guardar el array actualizado
        await writeFile('./src/data/ventas.json', JSON.stringify(ventas, null, 2));

        res.status(201).json({ mensaje: "Venta registrada exitosamente", venta: nuevaVenta });

    } catch (error) {
        console.error('Error al guardar la venta:', error);
        res.status(500).json({ error: "Error interno al registrar la venta" });
    }
});


router.post('/detalle', async (req, res) => {
    //Rango del total de ventas que filtra en el body
    const from = Number(req.body.from)
    const to = Number(req.body.to)

    //Body de Postman
    /* {
        "from": 2300,
        "to":  5000
    } */

    let comprador = ''

    try {
        const fileVentas = await readFile('./src/data/ventas.json', 'utf-8')
        const ventas = JSON.parse(fileVentas)

        const array = ventas.filter(e => e.total >= from && e.total <= to)

        const result = array.map(e => {
            comprador = get_user_byId(e.id_usuario)
            comprador = comprador.nombre + ' ' + comprador.apellido

            return {
                id_venta: e.id,
                direccion: e.direccion,
                comprador: comprador
            }
        })

        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(400).json(`No se encontraron ventas con valores entre ${from} y ${to}`)
        }
    } catch (error) {
        res.status(500).json('Error interno')
    }
})


//GET
router.get('/hola', async (req, res) => {
    try {

        res.status(200).json('200 hola')
        console.log("Holaaaaaaa")

    } catch (error) {
        res.status(500).json('Error ventas')
    }
})



export default router