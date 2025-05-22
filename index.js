//Importar
import express from 'express'
import dotenv from 'dotenv'
import usersRouter from './src/routes/usersRouter.js'
import productsRouter from './src/routes/productsRouter.js'
import ventasRouter from './src/routes/ventasRouter.js'

//Instancia de app
const app = express()

//Variables de entorno
dotenv.config()

//Configurar puerto
const port = process.env.PORT || 3000

//Para que express entienda json
app.use(express.json())

//Iniciar servidor
app.listen(port, ()=>{
    console.log(`Servidor iniciado en el puerto ${port}`)
})

//Definicion de rutas
app.use('/usuarios', usersRouter)
app.use('/productos', productsRouter)
app.use('/ventas', ventasRouter)



