var http = require ('http')

// Acá iría la base de datos // En esta variable vacía se van a agregar los usuarios creados
var db_agendar = []

var servidor = http.createServer(function (consulta, respuesta){
    if (consulta.url === '/agendar') {

        ////// Crear usuario///////
        if (consulta.method === 'POST') {
            var contenido = ''
            consulta.on('data', function (bloque_texto) {
                contenido += bloque_texto
            })
            consulta.on('end', function () {
                console.log(contenido)
                respuesta.end('anda bien!')  // Quede 16:40 (https://www.youtube.com/watch?v=k2r1TjCpxmU&feature=youtu.be)
            })
        }

        /////// Leer listado de usuarios ////////
        if (consulta.method === 'GET') {
            respuesta.end('zaraza')
        }

        /////// Borrar usuario ////////
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