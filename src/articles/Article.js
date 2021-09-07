const Sequelize = require("sequelize")
const connection = require("../database/database")

// importando para estabelecer relacionamento
const Category = require("../categories/Category")
const User  = require("../users/Users")

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

// Estabelendo relacionamento 1-n
Category.hasMany(Article)
User.hasMany(Article)
// Estabelecendo relacionamento 1-1
Article.belongsTo(Category)
Article.belongsTo(User)

// inicializa tabelas caso não existam
Article.sync({force: false})


module.exports = Article