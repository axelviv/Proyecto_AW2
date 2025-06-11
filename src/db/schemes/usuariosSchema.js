
import mongoose from 'mongoose';

const { Schema, models, model, ObjectId} = mongoose;

const UserSchema = new Schema({
    nombre: {type: String, required:true},
    apellido: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    contraseña: {type: String, required: true}
})

const User = models.User || model('User',UserSchema)

export default User

