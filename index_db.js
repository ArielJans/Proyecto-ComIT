//////////// MONGO DB ///////////

var MongoClient = require("mongodb").MongoClient;

// Connection URL
var url = 'mongodb+srv://arieljans:26781Jans@cluster0-b8qob.mongodb.net/test?retryWrites=true&w=majority';

// Database Name
var dbName = "agendar";

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log("Error: " + JSON.stringify(err));
    process.exit(1);
  }
  console.log("Conexión exitosa");

  var db = client.db(dbName);
  /// await db.collection('usuarios').insertOne({}) /// asi se llama a la BD usuario (si no existe se crea)

  client.close();
});
