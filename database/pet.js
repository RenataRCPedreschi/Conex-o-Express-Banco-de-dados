const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Cliente = require("./cliente");

const Pet = connection.define("pet", {
   nome: {
    type: DataTypes.STRING,
    allowNull:false
   },
   tipo:{
    type: DataTypes.STRING,
    allowNull: false
   },
   porte:{
    type: DataTypes.STRING,
    allowNull: false
   },
   dataNasc:{
    type: DataTypes.DATEONLY,
    allowNull: false
   } 
});

//relacionamento 1:N (um cliente pode ter N pet)
//
Cliente.hasMany(Pet);
Pet.belongsTo(Cliente);//um pet pertence a um cliente

module.exports = Pet;