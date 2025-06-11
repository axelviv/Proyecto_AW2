import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true }
});

const ventaSchema = new mongoose.Schema({
  id_usuario: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  direccion: { type: String, required: true },
  productos: [productoSchema]
});

const Venta = mongoose.model('Venta', ventaSchema);
export default Venta;
