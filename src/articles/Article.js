const Sequelize = require("sequelize")
const connection = require("../database/database")

/* Cria a estrutura da tabela. STRING < TEXT */
const Article = connection.define("articles",{
    title:{
        type: Sequelize.STRING,
        allownull : false
    },
    slug:{
        type: Sequelize.STRING,
        allownull: false
    },
    body:{
        type: Sequelize.TEXT,
        allownull: false
    }
})

module.exports = Article