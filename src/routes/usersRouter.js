import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const router = Router()


//GET
router.get('/all', async (req, res) => {
    try {
        const fileUsuarios = await readFile('./src/data/usuarios.json', 'utf-8')
        const usuarios = JSON.parse(fileUsuarios)

        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json('Error al leer usuarios')
    }
})


router.get('/nombre/:userId', async (req, res) => {
    const user_id = req.params.userId
    try {
        const fileUsuarios = await readFile('./src/data/usuarios.json', 'utf-8')
        const usuarios = JSON.parse(fileUsuarios)

        const index = usuarios.findIndex(e => e.id == user_id)
        if (index !== -1) {
            res.status(200).json(usuarios[index].nombre + ' ' + usuarios[index].apellido)
        }
        else {
            res.status(400).json('No se encontro al usuario')
        }
    } catch (error) {
        res.status(500).json('Error interno')
    }
})

//PUT
router.put('/email/:userId', async (req, res) => {
    const user_id = req.params.userId
    const correo = req.body.email

    //Body de Postman
    //  {
    //     "email": "pepito_argento73@hotmail.com"
    // } 

    try {
        const fileUsuarios = await readFile('./src/data/usuarios.json', 'utf-8')
        const usuarios = JSON.parse(fileUsuarios)

        const index = usuarios.findIndex(e => e.id == user_id)
        if (index !== -1) {
            usuarios[index].email = correo
            await writeFile('./src/data/usuarios.json', JSON.stringify(usuarios, null, 2))
            res.status(200).json("Email actualizado!")
        }
        else {
            res.status(400).json('no se encontro al usuario')
        }
    } catch (error) {
        res.send(500).json('Error al actualizar el email')
    }
})

//DELETE
router.delete('/delete/:userId', async (req, res) => {
    const user_id = req.params.userId

    try {
        const fileUsuarios = await readFile('./src/data/usuarios.json', 'utf-8')
        const usuarios = JSON.parse(fileUsuarios)
        const fileVentas = await readFile('./src/data/ventas.json', 'utf-8')
        const ventas = JSON.parse(fileVentas)
        

        const index = usuarios.findIndex(e => e.id == user_id)

        if (index !== -1) {
            //Eliminar usuario
            usuarios.splice(index, 1)
            await writeFile('./src/data/usuarios.json', JSON.stringify(usuarios, null, 2))

            //Eliminar compras del usuario
            const ventasAjenasAlUsuario = ventas.filter(e => e.id_usuario != user_id)
            await writeFile('./src/data/ventas.json', JSON.stringify(ventasAjenasAlUsuario, null, 2))

            res.status(200).json("El usuario y sus compras han sido eliminados!")
        }
        else {
            res.status(400).json('no se encontro al usuario')
        }
    } catch (error) {
        res.send(500).json('Error al eliminar al usuario')
    }
})


export default router