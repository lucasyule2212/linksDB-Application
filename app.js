const express = require("express");
const mongoose = require("mongoose"); //importando o mongoose = faz a ligaçao entre o banco de dados(mongoDB) com o JS, tratando os documents como JSON
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost/links", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // passando para o mongoose o endereço do mongoDB aberto

let db = mongoose.connection; //instanciando o DB

const linkSchema = new mongoose.Schema({
  //definindo o molde do objeto do DB
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  click: { type: Number, default: 0 },
});

const Link = mongoose.model("Link", linkSchema); //determinando a coleçao "Link", com objetos de molde "linkSchema".
//PS: o mongoose vai pluralizar o nome da coleçao ao salvar no Mongo, ex: link ->links/person->people

let link = new Link({
  //criando um objeto da coleçao Link
  title: "youtube",
  description: "Link para o Youtube",
  url: "https://youtube.com",
});

link
  .save()
  .then((doc) => {
    //link.save = salvando o objeto criado na coleçao
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

db.once("open", () => {
  console.log("Banco carregado com sucesso!");
});

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
