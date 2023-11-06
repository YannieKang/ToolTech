//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.json());
const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model
const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  const usuario = new Usuario({
    email : email,
    senha : senha,
  });

  try {
    const newUsuario = await await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

app.get("/", async()=>{
    res.sendFile(__dirname + "/index.html")
});

app.listen(port, ()=>{
    console.log(`Servidor rodanda na porta ${port}`)

});

const ProdutoSchema = new mongoose.Schema({
    id_produtoferramenta: { type: String, required: true },
    descricao: { type: String },
    marca : {type : String},
    data_fabricacao: {type : Date},
    quantidade_estoque : {type : Number},
  });
  
  const Produto = mongoose.model("Produto", ProdutoSchema);
  
  //configuração dos roteamendos
  //cadastrousuario
  app.post("/cadastrousuario", async (req, res) => {
    const id_produtoferramenta = req.body.id_produtoferramenta;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const data_fabricacao = req.body.data_fabricacao;
    const quantidade_estoque = req.body.quantidade_estoque;
  
    const produto = new Produto({
      id_produtoferramenta : id_produtoferramenta,
      descricao : descricao,
      marca : marca,
      data_fabricacao : data_fabricacao,
      quantidade_estoque : quantidade_estoque,
    });
  
    try {
      const newProduto = await await produto.save();
      res.json({ error: null, msg: "Cadastro ok", ProdutoId: newProduto._id });
    } catch (error) {}
  });
  
  app.get("/", async()=>{
      res.sendFile(__dirname + "/index.html")
  });
  
  app.listen(port, ()=>{
      console.log(`Servidor rodanda na porta ${port}`)
  
  })



