const express = require('express');
const mongoose = require('mongoose'); // Adicionado o Mongoose para a conexão com MongoDB
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://user1:User123@cluster0.srcqp.mongodb.net/checkpoint04_rm93688', {
  serverSelectionTimeoutMS: 50000, // Aumenta o tempo de timeout para 50 segundos
})
.then(() => {
  console.log('Conectado ao MongoDB com sucesso!');
})
.catch(err => {
  console.error('Erro ao conectar ao MongoDB', err);
});

// Middleware para configurar CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Importar o modelo de Produto
require('./models/modeloDeProduto');

// Rotas
const index = require('./routes/index');
app.use('/', index);

const produtoRouter = require('./routes/rotaDeProduto');
app.use('/produtos', produtoRouter);

module.exports = app;
