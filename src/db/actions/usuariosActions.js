
import { connectToDatabase } from "../connectionDB.js"
import User from "../schemes/usuariosSchema.js"

export const createUser = async ({ nombre, apellido, email, contraseña }) => {
    try {
        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { status: false, message: "El email ya está registrado" };
        }

        const res = await User.create({ nombre, apellido, email, contraseña });
       
        return {
            status: true,
            user: JSON.parse(JSON.stringify(res))
        };
    } catch (error) {
        return { status: false, message: "Error al crear usuario" };
    }
};


export const findUserByEmail = async (email) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) return null;
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findAll = async()=>{
    try{
        await connectToDatabase()
        const res = await User.find()
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const findById = async(id)=>{
    try{
        await connectToDatabase()
        const res = await User.findById(id)
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const deleteById = async(id)=>{
    try{
        await connectToDatabase()
        const res = await User.findByIdAndDelete(id)
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const updateMailById = async(id, email)=>{
    try{
        await connectToDatabase()
        const res = await User.findByIdAndUpdate(id,{email}, { new: true })
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}