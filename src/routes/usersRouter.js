import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { createUser, findUserByEmail, findAll, findById, deleteById, updateMailById } from "../db/actions/usuariosActions.js";
import { deleteByUserId } from "../db/actions/ventasActions.js";

const router = Router()
const SECRET = process.env.TOKN

//GET
router.get('/all', async (req, res) => {
    try {
        const usuarios = await findAll()

        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json('Error al leer usuarios')
    }
})


router.get('/nombre/:userId', async (req, res) => {
    const user_id = req.params.userId;
    try {
        const usuario = await findById(user_id);
        if (usuario) {            
            res.status(200).json({ nombreCompleto: usuario.nombre + ' ' + usuario.apellido });
        } else {
            res.status(404).json('No se encontró al usuario');
        }
    } catch (error) {
        res.status(500).json('Error interno');
    }
});


//POST
router.post('/create', async (req, res) => {
    const { nombre, apellido, email, contraseña } = req.body

    try {
        const hashedPass = await bcrypt.hash(contraseña, 8);

        const result = await createUser({ 
            nombre, 
            apellido, 
            email, 
            contraseña: hashedPass 
        });

        if (result.status) {
            res.status(201).json({
                status: true,
                message: "Usuario creado exitosamente",
                user: result.user
            })
        } else {
            res.status(409).json({
                status: false,
                message: result.message || "Error al crear usuario"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: false })
    }
})


router.post('/login', async (req, res) => {
    const user_email = req.body.email
    const pass = req.body.contraseña

    const result = await findUserByEmail(user_email);

    if (!result) {
        return res.status(404).send({ status: false });
    }

    const controlPass = bcrypt.compareSync(pass, result.contraseña)

    if (!controlPass) {
        return res.status(401).send({ status: false })
    }

    const token = jwt.sign({ ...result }, SECRET, { expiresIn: 3600 })

    res.status(200).json({
        token,
        nombre: result.nombre,
        apellido: result.apellido,
        id: result._id
    });
})


//PUT
router.put('/email/:userId', async (req, res) => {
  const user_id = req.params.userId;
  const correo = req.body.email;

  try {
   
    /* Body de Postman
    {
        "email": "homero@simpson.com.ar"
     }
        */  

    const usuarioActualizado = await updateMailById(user_id, correo);

    if (!usuarioActualizado) {
      return res.status(404).json('No se encontró al usuario');
    }

    res.status(200).json({
      message: 'Email actualizado!',
      usuario: usuarioActualizado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al actualizar el email');
  }
});


// //DELETE
router.delete('/delete/:userId', async (req, res) => {
    const user_id = req.params.userId

    try {     
        //Eliminar usuario   
        const usuario = await deleteById(user_id)

        if (!usuario) {
            return res.status(404).json('No se encontró al usuario');
        }

        //Eliminar compras
        await deleteByUserId(user_id)

        res.status(200).json("El usuario y sus compras han sido eliminados!");
    } catch (error) {
        res.send(500).json('Error al eliminar al usuario')
    }
})


export default router