const express = require("express");
const mongoose = require("mongoose"); //importando o mongoose = faz a ligaçao entre o banco de dados(mongoDB) com o JS, tratando os documents como JSON
const path = require('path');
const app = express();
const linkRoutes = require('./routes/linkRoutes');
const PORT = 3000;

mongoose.connect("mongodb://localhost/links", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // passando para o mongoose o endereço do mongoDB aberto

let db = mongoose.connection; //instanciando o DB

/*let link = new Link({
  //criando um objeto da coleçao Link
  title: "youtube",
  description: "Link para o Youtube",
  url: "https://youtube.com",
});*/

/*link
  .save()
  .then((doc) => {
    //link.save = salvando o objeto criado na coleçao
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });*/

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/',linkRoutes);

  //PESQUISANDO OBJETOS NA COLEÇAO E REDIRECIONANDO PARA OS LINKS QUE ELE REPRESENTA
db.once("open", () => { //once="open" garante que esse bloco vai ser executado só quando o banco estiver carregado.
  console.log("Banco carregado com sucesso!");
});





app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
