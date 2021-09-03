const express = require("express")
const router = express.Router()

const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")

// Route to list articles - begin
router.get("/admin/articles", async (req, res) => {
    await Article.findAll({
        include: [{
            model: Category
            
        }],
        order: [
            ['title', 'ASC']
        ]
    }).then(articles => {
        res.render("admin/articles/index.ejs", {
            articles: articles
        })
    })
})
// Route to list articles - end

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
    var body = req.body.body
    var category = req.body.category

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

// Route to delete a category - begin
router.post("/articles/delete", (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles")
            })
        } else {
            res.redirect("/admin/articles")
        }
    } else {
        res.redirect("/admin/articles")
    }
})
// Route to delete a category - end

module.exports = router