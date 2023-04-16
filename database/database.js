//database.js = arquivo de conexão com o banco de dados
//ele vai ler as variáveis de ambiente e tentar conectar o banco dados

const {Sequelize} = require("sequelize");

//Criamos o objeto de conexão

const connection = new Sequelize(
process.env.DB_NAME, //Nome reservado para o database
process.env.DB_USER, //Usuário reservado para conexão
process.env.DB_PASSWORD, //Senha reservada para acesso
{
    host:process.env.DB_HOST, //endereço(banco local)
    dialect:'mysql'//o banco utilizado
}
);

//Estabelecer conexão usando objeto

async function authenticate(connection){

try{
    //Tentar estabelecer a conexão com o banco de dados(usar as informações passadas)
    await connection.authenticate(); 
    console.log("Conexão estabelecida com sucesso!");
}catch(err){
//err = objeto que guarda detalhes sobre o erro que aconteceu
console.log("UM ERRO INESPERADO ACONTECEU!", err);
}
}

module.exports = {connection, authenticate}