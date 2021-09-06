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
    cookie: {maxAge: 86400000},
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
    res.redirect("/articles/page/1")
})
// Route to index - end

// Import controllers routes - begin
app.use("/", CategoriesController)
app.use("/", ArticlesController)
app.use("/", UsersController)
// Import controllers routes - end

app.listen(process.env.PORT || 8081, () => {
    console.log("Rodando")
})