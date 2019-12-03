
/// REFERENCIA: https://github.com/NormanPerrin/comit-node/blob/master/clases/noviembre/lunes-25.md



var http = require ('http')
var url = require('url')
var crypto = require('crypto')
var fs = require('fs')

// Acá iría la base de datos // En esta variable vacía se van a agregar los usuarios creados
var db_usuarios = []

function id_aleatorio() {
    return crypto.randomBytes(10).toString('hex')
}

function decodificarContenido(contenido) {
    var contenido_ok = decodeURIComponent(contenido)
    return new url.URLSearchParams(contenido_ok)
}

var servidor = http.createServer(function (consulta, respuesta){
    if (consulta.url === '/usuarios') {

        ////// Crear usuario///////
        if (consulta.method === 'POST') {
            var contenido = ''
            consulta.on('data', function (bloque_texto) { 
                contenido += bloque_texto
            })
            consulta.on('end', function () { 
                var contenidoEnpartes = decodificarContenido(contenido)
                var id_usuario = id_aleatorio()
                var nuevoUsuario = {
                    id: id_usuario,
                    user: contenidoEnpartes.get('user'),
                    email: contenidoEnpartes.get('email'),
                    pass: contenidoEnpartes.get('pass')
                }
                db_usuarios.push(nuevoUsuario)
                respuesta.end('anda bien!')  
            })
        }

        /////// Leer listado de usuarios ////////
        if (consulta.method === 'GET') {
            var contenidoRespuesta = JSON.stringify({usuarios: db_usuarios})
            respuesta.end(contenidoRespuesta)
        }

        /////// Borrar usuario ////////  // Quede 36:15 (https://www.youtube.com/watch?v=k2r1TjCpxmU&feature=youtu.be)
        if (consulta.method === 'DELETE') {
            respuesta.end('zaraza')
        }

        /////// Actualizar usuario //////
        if (consulta.method === 'PATCH') {
            respuesta.end('zaraza')
        }

        
    }else {
        respuesta.statusCode = 404;
        respuesta.end('Recurso no encontrado')
    }
})

servidor.listen(3000, function () {
    console.log('Estoy escuchando en el puerto 3000')
})