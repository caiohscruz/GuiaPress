const express = require("express")
const router = express.Router()

const Category = require("../categories/Category.js")
const Artivle = require("./Article")
const slugify = require("slugify")
const Article = require("./Article")

router.get("/admin/articles", (req, res) => {
    res.send("ROTA PARA ARTIGOS")
})

// Route to new article - begin
router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new.ejs", {
            categories: categories
        })
    })
})
// Route to new article - end

// Route to save a article - begin
router.post("/articles/save", (req, res) => {
    var title = req.body.title
    var body =req.body.body
    var category =req.body.category

    if (title != undefined) {
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: category
        }).then(() => {
            res.redirect("/admin/articles")
        })
    } else {
        res.redirect("admin/articles/new")
    }
})
// Route to save a article - end

module.exports = router