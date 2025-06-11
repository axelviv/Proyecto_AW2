//Importar
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import usersRouter from './src/routes/usersRouter.js'
import productsRouter from './src/routes/productsRouter.js'
import ventasRouter from './src/routes/ventasRouter.js'

//Instancia de app
const app = express()

//Configurar puerto
const port = process.env.PORT || 3002

//Para que express entienda json
app.use(express.json())

//Iniciar servidor
app.listen(port, ()=>{
    console.log(`Servidor iniciado en el puerto ${port}`)
})

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}))

//Rutas de ENDPOINT
app.use('/api/usuarios', usersRouter)
app.use('/api/productos', productsRouter)
app.use('/api/ventas', ventasRouter)



