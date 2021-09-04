// Setting express - begin
const express = require("express")
const app = express()
const path = require('path')
// Setting express - end

// Importo DB connection - begin
const connection = require("./database/database")
// Importo DB connection - end

// Import controllers - begin
const CategoriesController = require("./categories/CategoriesController")
const ArticlesController = require("./articles/ArticlesController")
// Import controllers - end

// Import models - begin
const Category = require("./categories/Category")
const Article = require("./articles/Article")
// Import models - end

// Setting View Engine - begin
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// Setting View Engine - end

// Setting public to static content - begin
app.use(express.static('public'))
// Setting public to static content - end

// Settings to use forms - begin
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
// Settings to use forms - end

// Conecction test - begin
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })
// Conecction test - end

// Route to index - begin
app.get("/", (req, res) => {
    Article.findAll().then(articles => {
        Category.findAll().then(categories => {
            res.render("index.ejs", {
                articles: articles,
                categories: categories
            })
        })
    })
})
// Route to index - end

// Route to an article- begin
app.get("/:slug", (req, res) => {
    var slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article.ejs", {
                    article: article,
                    categories: categories
                })
            })

        } else {
            res.redirect("/")
        }
    }).catch(erro => {
        res.redirect("/")
    })
})
// Route to an article- begin

// Import controllers routes - begin
app.use("/", CategoriesController)
app.use("/", ArticlesController)
// Import controllers routes - end

app.listen(process.env.PORT || 8081, () => {
    console.log("Rodando")
})