const Sequelize = require("sequelize")
const connection = require("../database/database")

/* Cria a estrutura da tabela. STRING < TEXT */
const User = connection.define("users",{
    email:{
        type: Sequelize.STRING,
        allownull : false
    },
    password:{
        type: Sequelize.STRING,
        allownull: false
    },
    username:{
        type: Sequelize.STRING,
        allownull: false
    }
})

// inicializa tabelas caso não existam
User.sync({force: false})

module.exports = User