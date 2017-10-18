'use strict'
const express = require('express')
var body_parser = require('body-parser')
var app = express()
var port = process.env.PORT || 9090
var CryptoJS = require("crypto-js");

app.use(body_parser.urlencoded({extended:true}));
app.use(express.static('public'))


app.listen(port, () => {
  console.log('Servidor iniciado en 8080')
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

app.post('/',(req,res)=>{
  var txt = req.body.textToEncrypt
  var psswrd = req.body.psswrd
  var type = req.body.type
  var proceso = req.body.type_cifer
  proceso = (proceso == 1) ? "Decifrar" : "Cifrar"
  var c = (proceso == 0) ? "decifrado" : "cifrado"
  var out
  /*switch(type){
      case 128:
        if(txt.length == 16){
           encrypted = CryptoJS.AES.encrypt(txt, psswrd);
        }else{
          encrypted = 'Tamaño de bloque incorrecto (tiene que ser de 128 bits = 16 caracteres)'
        }
      break
      case 192:
      break
      case 256:
      break
      default:
      break
  }*/
  if (proceso == "Cifrar") {
    var encrypted = CryptoJS.AES.encrypt(txt, psswrd);
    out = encrypted
  }else{
    var decrypted = CryptoJS.AES.decrypt(txt, psswrd);
    try{
      out = decrypted.toString(CryptoJS.enc.Utf8)  
    }catch(e){
      out = "contraseña incorrecta"
    }
    
  }
	

  var html = '<h1>Cifrado</h1>'
  html+= '<h2>Datos enviados:</h2>'
  html+= 'Texto a '+ proceso +': ' + txt + '<br>'
  html+= 'Contraseña: ' + psswrd + '<br>'
  html+= 'Tipo : AES-' + type + '<br>'
  html+= 'Proceso: ' + proceso + '<br>'
  html+= 'Texto ' + c +': ' + '<br>'
  html+= out

  res.send(html)
})

//var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
//var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
