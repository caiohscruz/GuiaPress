const express = require("express")
const router = express.Router()

const Category = require("../categories/Category.js")

router.get("/articles", (req,res) => {
    res.send("ROTA PARA ARTIGOS")
})

// Route to new article - begin
router.get("/admin/articles/new", (req,res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new.ejs", {categories})
    })
})
// Route to new article - end

module.exports = router