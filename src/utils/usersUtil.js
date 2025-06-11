
import { readFile, writeFile } from 'fs/promises'

//usuarios
const fileUsuarios = await readFile('./src/data/usuarios.json', 'utf-8')
const usuarios = JSON.parse(fileUsuarios)


export const get_user_byId = (id) =>{
    return usuarios.find(e => e.id == id)
}