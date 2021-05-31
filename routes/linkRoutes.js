const express = require('express');
const router = express.Router();
const linkController=require('../controllers/linkController');

//ARQUIVO ROUTES => DETERMINA CADA ROTA E OQ ELA VAI FAZER 
router.get("/all",linkController.allLinks);

router.get("/:title",linkController.redirect);//rota para redirecionar nossa url para a url do objeto que foi buscado
router.get("/edit/:id",linkController.loadLink)
router.get("/", (req, res) => res.render('index',{error:false,body:{}}));

router.post("/",express.urlencoded({extended:true}),linkController.addLink);//rota para adicionar um object na collection de links
router.post("/edit/:id",express.urlencoded({extended:true}),linkController.editLink);

router.delete("/:id",express.urlencoded({extended:true}),linkController.deleteLink)
module.exports=router;