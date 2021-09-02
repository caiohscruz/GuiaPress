const express = require("express")
const router = express.Router()

router.get("/articles", (req,res) => {
    res.send("ROTA PARA ARTIGOS")
})

// Form para criar categories
router.get("/admin/articles/new", (req,res) => {
    res.render("admin/articles/new.ejs")
})

module.exports = router