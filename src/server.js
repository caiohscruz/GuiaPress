// Setando o express
const express = require("express")
const app     = express()
const path = require('path')

// Setando conexão com o banco de dados
const connection = require("./database/database")

// Importando os controllers
const CategoriesController = require("./categories/CategoriesController")
const ArticlesController = require("./articles/ArticlesController")

// Importando os models
const Category = require("./categories/Category")
const Article = require("./articles/Article")

// Dizendo para o express que o EJS deve ser usado como View Engine
app.set('view engine', 'ejs')

// Para que o express reconheça imagens e CSS - public é o nome do diretorio
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))

// Para trabalhar com formulários
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// Conecction test - begin
connection
.authenticate()
.then( () => {
    console.log("Conexão feita com o banco de dados")
})
.catch((msgErro) => {
    console.log(msgErro)
})
// Conecction test - end

// Route to index - begin
app.get("/", (req,res) =>{
    Article.findAll().then(articles =>{
        res.render("index.ejs", {
            articles: articles
        })
    })
})
// Route to index - end

// Route to an article


// Integrando os controlers
app.use("/", CategoriesController)
app.use("/", ArticlesController)


app.listen(process.env.PORT||8081, ()=> {
    console.log("Rodando")
})