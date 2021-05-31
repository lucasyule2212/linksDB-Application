const Link = require('../models/Link');
//ARQUIVO CONTROLLER => DETERMINA OQUE CADA ROTA VAI FAZER

const redirect = async (req,res)=>{
    let title = req.params.title; // recebendo o title do objeto a ser buscado
    try {                           //utilizamos try catch para garantir que a funçao em "async/await" execute corretamente
      let doc = await Link.findOneAndUpdate({title},{$inc: {click: 1}});  //utilizaçao do metodo findOne para pegar apenas UM objeto com o filtro passado
        if (doc) {
            res.redirect(doc.url)
        } else {
            next();
        }
      
    } catch (error) {
      res.send(error);
    }
}

const loadLink = async(req,res)=>{
    let id = req.params.id;
    try {
        let link = await Link.findById(id);
        res.render('edit',{body:link,error:false});
    } catch (error) {
        res.render('edit',{body:link,error:true});
        
    }
}

const editLink=async (req,res)=>{
    let  link = {}; 
    link.title=req.body.title;
    link.description=req.body.description;
    link.url=req.body.url;
    try {       
        let doc = await Link.findByIdAndUpdate(req.params.id,link);
        res.redirect('/all');
    } catch (error) {
        res.render('edit',{error,body:req.body})
    }
}

const addLink = async (req,res)=>{
    let  link = new Link(req.body);  
    try {       
        let doc = await link.save();
        res.redirect('/all')
    } catch (error) {
        res.render('index',{error,body:req.body})
    }
}
const allLinks = async (req,res)=>{
    try {
        let links = await Link.find({})
        res.render('all',{links:links});
    } catch (error) {
        res.send(error)
    }
}

const deleteLink = async (req,res)=>{
    let id=req.params.id;
    if (!id) {
        id=req.body.id;
    }
    try {
       res.render(await Link.findByIdAndDelete(id));
       res.send(id);
    } catch (error) {
        res.send(error);
    }
}
module.exports={redirect,addLink,allLinks,deleteLink,editLink,loadLink};