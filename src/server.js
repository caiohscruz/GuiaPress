// Setting express - begin
const express = require("express")
const app = express()
const path = require('path')
// Setting express - end

// sessions - begin
const session = require("express-session")
app.use(session({
    // to improve security
    secret: "dsajdksdjkaskdajdkasdierwer",
    cookie: {
        maxAge: 86400000
    },
    resave: true,
    saveUninitialized: true
}))
// sessions -end

// Importo DB connection - begin
const connection = require("./database/database")
// Importo DB connection - end

// Import controllers - begin
const CategoriesController = require("./categories/CategoriesController")
const ArticlesController = require("./articles/ArticlesController")
const UsersController = require("./users/UsersController")
// Import controllers - end

// import model - begin
const Category = require("./categories/Category")
const Article = require("./articles/Article")
const User = require("./users/Users")
// import model - end

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
app.get("/", async (req, res) => {
    var offset = 0
    var quant = 4
    var articles
    var page=1

    // findAndCountAll return all and the number of results
    articles = await Article.findAndCountAll({
        // articles per page
        limit: quant,
        // first article of page
        offset: offset,
        order: [
            ['id', 'DESC']
        ],
        include: [{
            model: User
        }, {
            model: Category
        }]
    })

    // check if exists next page, disable button if dont
    var next = (offset + quant < articles.count) ? "" : "disabled"
    // check if exists previous page, disable button if dont
    var previous = "disabled"
    // num of pages 
    var total = (articles.count % quant == 0) ? (articles.count / quant) : (parseInt(articles.count / quant) + 1)
    // page cant be bigger than total

    var result = {
        next: next,
        previous: previous,
        page: parseInt(page),
        total: total,
        articles: articles
    }

    Category.findAll({
        order: [
            ['title', 'ASC']
        ]
    }).then(categories => {
        res.render("index.ejs", {
            result: result,
            categories: categories
        })
    })

})
// Route to index - end

// route to about - begin
app.get("/about", async (req, res) => {
    await Category.findAll().then(categories => {
        res.render("about.ejs", {
            categories: categories
        })
    })
})
// route to about - end

// Import controllers routes - begin
app.use("/", CategoriesController)
app.use("/", ArticlesController)
app.use("/", UsersController)
// Import controllers routes - end

app.listen(process.env.PORT || 8081, () => {
    console.log("Rodando")
})