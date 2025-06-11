
import mongoose from 'mongoose';

const { Schema, models, model, ObjectId} = mongoose;

const ProductSchema = new Schema({
    title: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});


const Product = models.Product || model('Product',ProductSchema)

export default Product