const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/tooltech", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String}
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const ProdutoFerramentaSchema = new mongoose.Schema({
    id_produtoferramenta: { type: String, required: true },
    descricao: { type: String},
    marca: { type: String},
    dataFabricacao: { type: Date},
    quantidadeEstoque: { type: Number}
});

const ProdutoFerramenta = mongoose.model("ProdutoFerramenta", ProdutoFerramentaSchema);

app.post("/cadastrousuario", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
  
    
    
    const usuario = new Usuario({
      email: email,
      senha: senha
    });
  
    try {
      const newUsuario = await usuario.save();
      res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
    } catch (error) {}
});

app.post("/cadastroprodutoferramenta", async (req, res) => {
    const id_produtoferramenta = req.body.id_produtoferramenta;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const dataFabricacao = req.body.dataFabricacao;
    const quantidadeEstoque = req.body.quantidadeEstoque;
  
    
    const produtoFerramenta = new ProdutoFerramenta({
      id_produtoferramenta: id_produtoferramenta,
      descricao: descricao,
      marca: marca,
      dataFabricacao: dataFabricacao,
      quantidadeEstoque: quantidadeEstoque
    });
  
    try {
      const newProdutoFerramenta = await produtoFerramenta.save();
      res.json({ error: null, msg: "Cadastro ok", ProdutoFerramentaId: newProdutoFerramenta._id });
    } catch (error) {}
});


