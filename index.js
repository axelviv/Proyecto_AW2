//Importar
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import usersRouter from './src/routes/usersRouter.js'
import productsRouter from './src/routes/productsRouter.js'
import ventasRouter from './src/routes/ventasRouter.js'
import fs from 'fs'


//Instancia de app
const app = express()

//Configurar puerto
const port = process.env.PORT || 3002

//Para que express entienda json
app.use(express.json())

// Middleware de logging de solicitudes
app.use((req, res, next) => {
  const now = new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
  })
  const log = `${now} | ${req.method} ${req.url}\n`
  fs.appendFile('logs.txt', log, (err) => {
    if (err) {
      console.error('Error al escribir en logs.txt:', err)
    }
  })
  next()
})

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



