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
router.get("/admin/articles/new", async (req, res) => {
    await Category.findAll().then(categories => {
        res.render("admin/articles/new.ejs", {
            categories: categories
        })
    })
})
// Route to new article - end

// Route to save a article - begin
router.post("/articles/save", async (req, res) => {
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    if (title != undefined) {
        await Article.create({
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

// Route to delete a article - begin
router.post("/articles/delete", async (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            await Article.destroy({
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
// Route to delete a article - end

// Route to edit article page - begin
router.get("/admin/articles/edit/:id", async (req, res) => {
    var id = req.params.id

    if (!isNaN(id)) {
        await Article.findByPk(id).then(async article => {
            if (article != undefined) {

                await Category.findAll().then(categories => {

                    res.render("admin/articles/edit.ejs", {
                        article: article,
                        categories: categories
                    })
                })
            } else {
                res.redirect("/admin/articles")
            }
        }).catch(erro => {
            res.redirect("/admin/articles")
        })
    } else {
        res.redirect("/admin/articles")
    }
})
// Route to edit article page - end

// Route to update a article - begin
router.post("/articles/update", async (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    await Article.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles/")
    })
})
// Route to update a article - end


module.exports = router