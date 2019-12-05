var express = require('express');
var bodyParser = require('body-parser')

var app = express() /// var servidor = express()
var puerto = process.env.PORT || 3000

var bd_usuarios = []

app.use(bodyParser.urlencoded({extended: false})) /// Transforma el string a un objeto con los atributos necesarios
app.use(bodyParser.json())

app.use(express.static('./recursos-estaticos'))

/////// Leer listado de usuarios ////////
app.get('/api/usuarios', function(_, res) {
  res.json({ usuarios: bd_usuarios })
})

////// Crear usuario///////
app.post('/api/usuarios', function(req, res) {
  bd_usuarios.push({
    user: req.body.user,
    email: req.body.email,
    pass: req.body.pass
  })
  res.status(201).redirect('/login.html')
})

app.listen(puerto, function() {
  console.log('Servidor escuchando conexion en puerto ' + puerto)
})

/////// Borrar usuario ////////

/////// Actualizar usuario //////
