const Sequelize = require("sequelize")
const connection = require("../database/database")

// importando Category para estabelecer relacionamento
const Category = require("../categories/Category")

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
    },
    author:{
        type: Sequelize.STRING,
        allownull : false
    },
})

// Estabelendo relacionamento 1-n
Category.hasMany(Article)
// Estabelecendo relacionamento 1-1
Article.belongsTo(Category)

// inicializa tabelas caso não existam
Article.sync({force: false})


module.exports = Article