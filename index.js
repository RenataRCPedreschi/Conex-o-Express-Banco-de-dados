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
const morgan = require("morgan");

//Configuração APP
const app = express();
app.use(express.json()); //Possibilitar transitar dados usando JSON
app.use(morgan("dev"));

//Configuração do Banco de dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); //efetivar a conexão
/* //Configurar o model da aplicação
const Cliente = require("./database/cliente");
const Endereco = require("./database/endereco");
const Pet = require("./database/pet"); */

//Definição de rotas
const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets");

app.use(rotasClientes);//Configurar o grupo de rotas no app
app.use(rotasPets);

//Escuta dos eventos(listen)

app.listen(3000, () => {
  //Gerar as tabelas a partir do model
  //Force = apaga tudo e recria as tabelas
  connection.sync(/* { force: true } */);
  console.log("Servidor rodando em http://localhost:3000");
});
