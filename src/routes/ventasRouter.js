import { Router } from "express";
import { verifyToken } from "../utils/middleware.js";
import { createVenta, findByUserId } from "../db/actions/ventasActions.js"; 

const router = Router();

router.post('/nueva', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!await verifyToken(token)) {
    return res.status(401).json({ status: false, message: 'No autorizado' });
  }

  try {
    const { productos, total, direccion, id_usuario } = req.body;

    // Validaciones básicas (opcionales)
    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: 'Productos inválidos' });
    }

    if (!id_usuario || !total || !direccion) {
      return res.status(400).json({ error: 'Faltan datos de la venta' });
    }

    const venta = await createVenta({
      id_usuario,
      total,
      direccion,
      productos
    });

    res.status(201).json({ mensaje: 'Venta registrada exitosamente', venta });
  } catch (error) {
    console.error('Error al guardar la venta:', error);
    res.status(500).json({ error: 'Error interno al registrar la venta' });
  }
});


router.post('/user/:userId', async (req, res) => {
  const user_id = req.params.userId;

  try {
    const result = await findByUserId(user_id);

    if (!result) {
      return res.status(404).json({ status: false, message: "No se encontraron ventas para este usuario" });
    }

    res.status(200).json({ status: true, ventas: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Error interno al buscar ventas" });
  }
});




export default router