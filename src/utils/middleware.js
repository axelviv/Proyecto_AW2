
import jwt from 'jsonwebtoken';
const SECRET = "6LHYRJWNQ3vQMwx_yry6AGMbuxu_YEbngXLqwcugYImqvKZSd60hjhqkyqGILlXN"

export const verifyToken = async (token) => {

    console.log(token)
    if (!token) {
      return false; 
    }
  
    try {
      const decode = await jwt.verify(token, SECRET);
      console.log(decode)
      return true;  
    } catch (error) {
      console.log(error);
      return false
    }
} 

export const decodeToken=async(token)=>{

    if(!verifyToken){
        return false
    }
    const decode = await jwt.verify(token, SECRET)
    return decode
}