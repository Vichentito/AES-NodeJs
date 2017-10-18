'use strict'
const express = require('express')
var app = require('express')
var port = process.env.PORT || 9090

app.use(express.static('public'))
server.listen(port, () => {
  console.log('Servidor iniciado en 8080')
})

app.get('/', function (req, res) {
  //res.sendFile(__dirname + '/public/index.html');
});
