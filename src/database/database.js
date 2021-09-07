// Permite interagir com diferentes bancos de dados
const Sequelize = require("sequelize")

// Setando variáveis de ambiente com dotenv
require('dotenv/config');

/*
// passando parametros separadamente
const connection = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: "-03:00" // BR
})
*/
// passando string de conexao
const connection = new Sequelize(process.env.DB_CONECCTION_URI)

module.exports = connection