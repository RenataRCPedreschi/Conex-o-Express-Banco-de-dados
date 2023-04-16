// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade vira uma coluna da tabela

// DataTypes = serve para definir qual o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");


const Cliente = connection.define("cliente", {
  // Configurar a coluna 'nome'
  nome: {
    // nome VARCHAR NOT NULL
    type: DataTypes.STRING(130),
    allowNull: false, // NOT NULL
  },
  email: {
    // email VARCHAR UNIQUE NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    // telefone VARCHAR NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//Associação 1:1 (One-to-one)
const Endereco = require("./endereco"); //importa endereço

//o cliente tem  endereço
//Endereço ganha uma chave estrangeira (nome do model + id)
//chave estrangeira = clienteId
Cliente.hasOne(Endereco); 
Endereco.belongsTo(Cliente);//endereço pertence a um cliente


module.exports = Cliente;
