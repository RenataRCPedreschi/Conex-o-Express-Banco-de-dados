const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Endereco = connection.define("endereco", {
  uf: {
    type: DataTypes.STRING(2),
    allowNull: false, // NOT NULL
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  cep: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Endereco;