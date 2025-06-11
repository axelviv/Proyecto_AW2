import { connectToDatabase } from "../connectionDB.js";
import Venta from "../schemes/ventasSchema.js";


export const createVenta = async ({ id_usuario, total, direccion, productos }) => {
  try {
    await connectToDatabase();

    const nuevaVenta = await Venta.create({
      id_usuario,
      total,
      direccion,
      productos 
    });

    return JSON.parse(JSON.stringify(nuevaVenta));
  } catch (error) {
    console.error("Error al crear la venta:", error);
    throw error;
  }
};


export const deleteByUserId = async (id) => {
  try {
    await connectToDatabase();
    const res = await Venta.deleteMany({ id_usuario: id });
  } catch (error) {
    console.log(error);
  }
}


export const findByUserId = async (id) => {
  try {
    await connectToDatabase();
    const ventas = await Venta.find({ id_usuario: id });
    if (!ventas || ventas.length === 0) return null;
    return JSON.parse(JSON.stringify(ventas));
  } catch (error) {
    console.error(error);
    return null;
  }
};
