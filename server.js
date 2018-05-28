// Abhängigkeiten definieren
var express = require('express');
var server = express(); // express an die Variable "server" binden
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient // Variable für Datenbank-Client
var path = require("path");

var db; // Variable für Datenbank definieren

// bodyparser konfigurieren
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());

var router = express.Router(); // Instanz des express Routers

server.use('/', router); // Router konfigurieren

router.get('/', (req, res) => {

  res.sendFile(path.join(__dirname + '/payment_basic.html'));

})

router.get('/2', (req, res) => {

  res.sendFile(path.join(__dirname + '/payment_shippingAddress.html'));

})

router.get('/3', (req, res) => {

  res.sendFile(path.join(__dirname + '/payment_Sale.html'));

})

router.get('/4', (req, res) => {

  res.sendFile(path.join(__dirname + '/payment_Tax.html'));

})

router.get('/5', (req, res) => {

  res.sendFile(path.join(__dirname + '/payment_reject_creditcards.html'));

})

router.get('/6', (req, res) => {

  res.sendFile(path.join(__dirname + '/payment_reject_shippingAddress.html'));

})

router.post('/payment', (req, res) => {

  db.collection('payment').save(req.body, (err, result) => {
    if (err) return console.log(err)

    res.status(201).send(req.body);
  })

});

MongoClient.connect('mongodb://localhost:27017/paymentDb', (err, client) => {
  if (err) return console.log(err)
  db = client.db('paymentDb') // whatever your database name is

  server.listen(8080, () => {
    console.log("Server starten mit localhost:8080");
  });
});
