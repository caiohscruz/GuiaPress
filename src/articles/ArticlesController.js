const express = require("express")
const router = express.Router()

router.get("/articles", (req,res) => {
    res.send("ROTA PARA ARTIGOS")
})

router.get("/admin/articles/new", (req,res) => {
    res.send("ROTA PARA CRIAR ARTIGOS")
})

module.exports = router