
import { connectToDatabase } from "../connectionDB.js"
import Product from "../schemes/productosSchema.js"

export const createProd = async({title, img, description, price, Category})=>{
    try{
        await connectToDatabase()
        const res = await Product.create({title, img, description, price, Category})
        
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const findAll = async()=>{
    try{
        await connectToDatabase()
        const res = await Product.find().populate({path:"category"})
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}

export const findById = async(id)=>{
    try{
        await connectToDatabase()
        const res = await Product.findById(id).populate({path:"category"})
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}



