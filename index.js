require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const router = express.Router()
const fs = require('fs')
const CEC = process.env.CLAVE_EDITOR_CONTENIDO || "clave_editor"
// Configuración
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname)
// Ficheros estaticos
app.use(express.static(path.join(__dirname, './docs')))
// Accesorios
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// Rutas
// ARRANQUE SERVIDOR
app.listen(app.get('port'), () => {
  console.log(`Servidor en puerto -  ${app.get('port')}`)
})