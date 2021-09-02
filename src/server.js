// Setando o express
const express = require("express")
const app     = express()
const path = require('path')

// Componente necessário para capturar valores do formulário
const bodyParser = require("body-parser")

// Setando conexão com o banco de dados
const connection = require("./database/database")

// Dizendo para o express que o EJS deve ser usado como View Engine
app.set('view engine', 'ejs')
// Para que o express reconheça imagens e CSS - public é o nome do diretorio
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))

//
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
}))

// Apresentará no console se a conexão transcorreu bem
connection
.authenticate()
.then( () => {
    console.log("Conexão feita com o banco de dados")
})
.catch((msgErro) => {
    console.log(msgErro)
})


app.get("/", (req,res) =>{
    res.send("Bem vindo ao meu site")
})

app.listen(process.env.PORT||8081, ()=> {
    console.log("Rodando")
})