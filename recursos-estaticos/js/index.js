var express = require("express");
var app = express()
var puerto = process.env.PORT || 3000
app.use(express.static('./recursos-estaticos'))

var db_usuarios = []

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(puerto, function() {
  console.log('Servidor escuchando conexion en' + puerto)
})
