const Sequelize = require("sequelize")
const connection = require("../database/database")

/* Cria a estrutura da tabela. STRING < TEXT */
const Category = connection.define("categories",{
    title:{
        type: Sequelize.STRING,
        allownull : false
    },
    slug:{
        type: Sequelize.STRING,
        allownull: false
    }
})

// inicializa tabelas caso não existam
Category.sync({force: false})

module.exports = Category