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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) /// *

app.use(express.static('./recursos-estaticos'))

/////// Leer listado de eventos //////// ACA TENDRIA QUE TOMAR Y MOSTRAR TODOS LOS EVENTOS EN EL CALENDARIO 
app.get('/api/eventos', async function (_, res) {
    var registro = await db.collection('eventos').find().toArray()
    res.json(registro)
})

////////// Agregar evento //////////// ACA INTENTO TOMAR LOS DATOS DE UN EVENTO Y HACER UN POST A LA BD
app.post('/api/eventos', async function (req, res) {
    await db.collection('eventos').insertOne({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        backgroundColor: req.body.backgroundColor,
        borderColor: req.body.borderColor
    })
    res.status(201).send('Registro exitoso')
})

app.listen(puerto, function () {
    console.log('Servidor escuchando conexion en puerto ' + puerto)
})



////////////////////  FER  ///////////////////////// 

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

/////// Por ahi es util: https://fullcalendar.io/docs/v3/event-source-object#options

///// Recupera eventos que FullCalendar tiene en la memoria. https://fullcalendar.io/docs/v3/clientEvents

//// Recupera un objeto de origen de evento específico . https://fullcalendar.io/docs/v3/getEventSourceById 

//// UTIL POR LEER BIEN: https://stackoverflow.com/questions/57154298/fullcalendar-js-get-selected-days

/// https://fullcalendar.io/docs/v3/eventReceive

/// https://fullcalendar.io/docs/v3/drop 


//// util para otra forma de guardar https://fullcalendar.io/docs/v3/dayClick



