var express = require('express');
var bodyParser = require('body-parser')
var MongoClient = require("mongodb").MongoClient;

var app = express() 
var puerto = process.env.PORT || 3000

// Connection URL
var url = 'mongodb+srv://arieljans:agermanj@cluster0-b8qob.mongodb.net/test?retryWrites=true&w=majority';
var db;
var dbName = "agendar";

// Use connect method to connect to the server
MongoClient.connect(url, async function (err, client) {
  if (err) {
    console.log("Error: " + JSON.stringify(err));
    process.exit(1);
  } else {
    console.log("Conexión exitosa");
    db = client.db(dbName);
    
  }
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) /// *

app.use(express.static('./recursos-estaticos'))

////////// Agregar usuarios ////////////
app.post('/api/usuarios', async function (req, res) {
  await db.collection('personas').insertOne({
    user: req.body.user,
    email: req.body.email,
    pass: req.body.pass
  })
  res.status(201).redirect('/login.html')
})

//////// ENVIO DE EVENTO NUEVO A DB ////////
app.post('/api/eventos', async function (req, res) {
  await db.collection('eventos').insertOne({
    titulo:eq.body.titulo,
    fecha: req.body.fecha
  })
  res.status(201).send('evento cerado correctamente')
})

/////// Borrar todos los usuarios ////////
//app.post('/api/usuarios', async function () {
//await db.collection('/usuarios').deleteMany()
//})

/////// Leer listado de usuarios ////////
app.get('/api/usuarios', async function(_, res) {
  var usuarios = await db.collection('personas').find().toArray()
  res.json(usuarios)
})


////////// Login usario existente ////////////
app.post('/api/login', async function (req, res) {
   var usuario = await db.collection('personas').findOne({
     email: req.body.email,
     pass: req.body.pass 
  })
  if (!usuario) {
    res.status(401).send('login Incorrecto')
  }else{
    res.status(201).redirect('/index.html')
  }
})

app.listen(puerto, function () {
  console.log('Servidor escuchando conexion en puerto ' + puerto)
})
