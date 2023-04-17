//Configura a biblioteca - Vai disponibilizar o uso de variáveis de ambiente

/* ORM => Object-Relational Mapper
	- gerar automaticamente as tabelas do banco;
	- inserir dados;
	- atualizar dados;
	- deletar dados;
	- consultar/filtrar dados; */

//Importações principais e variáveis de ambiente
require("dotenv").config();
const express = require("express");

//Configuração APP
const app = express();
app.use(express.json()); //Possibilitar transitar dados usando JSON

//Configuração do Banco de dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); //efetivar a conexão
//Configurar o model da aplicação
const Cliente = require("./database/cliente");
const Endereco = require("./database/endereco");

//Definição das rotas

//listar clientes
app.get("/clientes", async (req, res) => {
  //SELECT * FROM clientes
  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
});

//buscar cliente específico
app.get("/clientes/:id", async (req, res) => {
  const cliente = await Cliente.findOne({ where: { id: req.params.id }, include:[Endereco],
   });
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ message: "Usuário não encontrado." });
  }
});

//adicionar clientes
app.post("/clientes", async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  //Passo para adicionar:
  //Chamar Model.create
  try {
    //Dentro de 'novo' estará o objeto criado
    const novo = await Cliente.create(
      { nome, email, telefone, endereco },
      { include: [Endereco] }
    ); //Permite inserir cliente e endereço num comando
    res.status(201).json(novo); //201 - cliente criado
  } catch (err) {
    res.status(500).json({ message: "Um erro aconteceu" });
  }
});

//Escuta dos eventos(listen)

app.listen(3000, () => {
  //Gerar as tabelas a partir do model
  //Force = apaga tudo e recria as tabelas
  connection.sync({ force: true });
  console.log("Servidor rodando em http://localhost:3000");
});
