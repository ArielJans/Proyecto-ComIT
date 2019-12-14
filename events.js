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

        //////////REALIZADO PARA PROBAR LA CONEXIOAN A LA BD: FUNCIONA BIEN/////////////////////////////////

        //////// AGREGAR EVENTO ///////
        //await db.collection('eventos').insertOne({ nombre: 'Juan Ramon' }) 
        //console.log("Se agrego un evento")  

        //////// MOSTRAR TODOS LOS EVENTOS ///////
        //var registro = await db.collection('eventos').find().toArray()
        //console.log(JSON.stringify(registro)) 

        //////// ELIMINAR EVENTO ///////
        //await db.collection('eventos').deleteOne({ nombre: 'Juan Ramon' }) 
        //console.log("Se elimino un evento")  

        //////// MOSTRAR TODOS LOS EVENTOS ///////
        //var registro = await db.collection('eventos').find().toArray()
        //console.log(JSON.stringify(registro)) 
    }
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) /// *

app.use(express.static('./recursos-estaticos'))


////////// Agregar evento //////////// ACA INTENTO TOMAR LOS DATOS DE UN EVENTO Y HACER UN POST A LA BD
/// class="fc-body" || id="calendar" para "escuchar" solo cuando se suelta en el calendario

/// OPCION: var evento = document.getElementById("calendar")
/*
var evento = document.getElementsByClassName("fc-body")
evento.addEventListener('onmouseup', function () {   

    app.post('/api/eventos', async function (req, res) {
        await db.collection('eventos').insertOne({
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            backgroundColor: req.body.backgroundColor,
            borderColor: req.body.borderColor
        })
        res.status(201).send('Registro exitoso')
    })

})
*/

////// ACA TENDRIA QUE TOMAR Y MOSTRAR TODOS LOS EVENTOS EN EL CALENDARIO///////
///////// LOS LEE BIEN PERO TENGO QUE VER COMO MOSTRARLO EN LA FECHA CORRESPONDIENTE A CADA EVENTO///////////

/////// Leer listado de eventos ////////
app.get('/api/eventos', async function (_, res) {
    var registro = await db.collection('eventos').find().toArray()
    res.json(registro)
})

app.listen(puerto, function () {
    console.log('Servidor escuchando conexion en puerto ' + puerto)
})

/*
////////////////////ECHO POR FER PARA SELECCIONAR CUALQUIER COSA DEL DOM ///////////////////////// 

//document.body.addEventListener("click", function (elemento) {
   // alert(elemento.target)
//});

/////////////////////////////////////////////

/// Funcion ejemplo que toma el valor de un input de auerdo su ID. Hecha por mi...
var getData = function () {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var backgroundColor = document.getElementById("backgroundColor").value;
    var borderColor = document.getElementById("borderColor").value;
}

/// Funcion ejemplo que toma el valor de un input de auerdo su ID. Hecha por mi...

events: [
    {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    start: document.getElementById("start").value,
    end: document.getElementById("end").value,
    backgroundColor: document.getElementById("backgroundColor").value,
    borderColor: document.getElementById("borderColor").value
}
]

/// U OLA OPCION QUE ENGLOBA TODOS LOS DATOS DEL EVENTO (CREO)
events: [
    {
        events: document.getElementsByTagName("events")[0],
        events: document.getElementById("id").value
    }
]
*/

///// Recupera eventos que FullCalendar tiene en la memoria. https://fullcalendar.io/docs/v3/clientEvents

//// Recupera un objeto de origen de evento específico . https://fullcalendar.io/docs/v3/getEventSourceById 

//// UTIL POR LEER BIEN: https://stackoverflow.com/questions/57154298/fullcalendar-js-get-selected-days

/// https://fullcalendar.io/docs/v3/eventReceive

/////// Por ahi es util: https://fullcalendar.io/docs/v3/event-source-object#options

/// https://fullcalendar.io/docs/v3/drop 

/// buena info de dayclick, eventclick, events, etc: https://ics-software-engineering.github.io/meteor-example-fullcalendar/

/// ottro mas https://blog.thira.com.au/post/93184225152/a-mongodb-backend-for-fullcalendar-in-10-minutes

//// util para otra forma de guardar https://fullcalendar.io/docs/v3/dayClick

/// PARA USAR: addEventListener() :Añadiremos eventos a cualquier elemento de la página web, tal como onclick, onmouseover, onmouseout, etc.

//// VIDEO PARA PHP https://www.youtube.com/watch?v=WrU8t6Lk5SM