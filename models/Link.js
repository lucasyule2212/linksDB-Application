const mongoose = require('mongoose');
//ARQUIVO LINK => DETERMINA O MODELO DA COLLECTION A SER TRABALHADA
const linkSchema = new mongoose.Schema({
    //definindo o molde do objeto do DB
    title: { type: String, required: true },
    description: String,
    url: { type: String, required: true },
    click: { type: Number, default: 0 },
  });
  
  module.exports= mongoose.model("Link", linkSchema); //determinando a coleçao "Link", com objetos de molde "linkSchema".
  //PS: o mongoose vai pluralizar o nome da coleçao ao salvar no Mongo, ex: link ->links/person->people