const express = require('express');
const bodyParser = require('body-parser');
const { validarCadastroUsuario, cadastrarUsuario } = require('./models/usuarioModel');
const { validarCadastroProduto, cadastrarProduto } = require('./models/produtoModel');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/cadastro-usuario', (req, res) => {
  const dadosUsuario = req.body;
  const validacaoUsuario = validarCadastroUsuario(dadosUsuario);

  if (validacaoUsuario.error) {
    return res.status(400).send(validacaoUsuario.error.details[0].message);
  }

  if (usuarioJaCadastrado(dadosUsuario.username)) {
    return res.status(400).send('Usuário já cadastrado. Escolha outro username.');
  }

  const resultadoCadastro = cadastrarUsuario(dadosUsuario);

  if (resultadoCadastro) {
    res.send('Usuário cadastrado com sucesso!');
  } else {
    res.status(500).send('Erro ao cadastrar usuário. Tente novamente mais tarde.');
  }
});


app.post('/cadastro-produto', (req, res) => {
  const dadosProduto = req.body;
  const validacaoProduto = validarCadastroProduto(dadosProduto);

  if (validacaoProduto.error) {
    return res.status(400).send(validacaoProduto.error.details[0].message);
  }

  if (produtoJaCadastrado(dadosProduto.nome)) {
    return res.status(400).send('Produto já cadastrado. Escolha outro nome.');
  }

  const resultadoCadastro = cadastrarProduto(dadosProduto);

  if (resultadoCadastro) {
    res.send('Produto cadastrado com sucesso!');
  } else {
    res.status(500).send('Erro ao cadastrar produto. Tente novamente mais tarde.');
  }
});


function usuarioJaCadastrado(username) {

  return false; 
}


function produtoJaCadastrado(nomeProduto) {

  return false; 
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});