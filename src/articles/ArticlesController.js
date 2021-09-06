const express = require("express")
const router = express.Router()

const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")

const adminAuth = require("../middlewares/adminAuth")

// Route to list articles - begin
router.get("/admin/articles", adminAuth, async (req, res) => {
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
router.get("/admin/articles/new", adminAuth, async (req, res) => {
    await Category.findAll().then(categories => {
        res.render("admin/articles/new.ejs", {
            categories: categories
        })
    })
})
// Route to new article - end

// Route to save a article - begin
router.post("/articles/save", adminAuth, async (req, res) => {
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
router.post("/articles/delete", adminAuth, async (req, res) => {
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
router.get("/admin/articles/edit/:id", adminAuth, async (req, res) => {
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
router.post("/articles/update", adminAuth, async (req, res) => {
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
    }).catch(erro => {
        res.redirect("/admin/articles/")
    })
})
// Route to update a article - end

// Route to article pagination filtered or not by category- begin
router.get("/:slug?/articles/page/:page", async (req, res) => {
    var page = req.params.page
    var offset = 0
    var quant = 4
    var slug = req.params.slug
    var categoryId
    var articles

    if (!isNaN(page) && (parseInt(page) > 1)) {
        offset = (parseInt(page) - 1) * quant
    }
    if (slug != undefined) {
        await Category.findOne({
            where: {
                slug: slug
            }
        }).then(async category => {
            categoryId = category.id
        })
        // findAndCountAll return all and the number of results
        articles = await Article.findAndCountAll({
            where: {
                categoryId: categoryId
            },
            // articles per page
            limit: quant,
            // first article of page
            offset: offset,
            order: [
                ['id', 'DESC']
            ]
        })
    } else {
        // findAndCountAll return all and the number of results
        articles = await Article.findAndCountAll({
            // articles per page
            limit: quant,
            // first article of page
            offset: offset,
            order: [
                ['id', 'DESC']
            ]
        })
    }

    // check if exists next page, disable button if dont
    var next = (offset + quant < articles.count) ? "" : "disabled"
    // check if exists previous page, disable button if dont
    var previous = (page > 1) ? "" : "disabled"
    // num of pages 
    var total = (articles.count % quant == 0) ? (articles.count / quant) : (parseInt(articles.count / quant) + 1)
    // page cant be bigger than total
    if (page > total) {
        res.redirect("/articles/page/" + total)
    }

    var result = {
        next: next,
        previous: previous,
        page: parseInt(page),
        total: total,
        slug: slug,
        articles: articles
    }
    if (slug == undefined) {
        Category.findAll().then(categories => {
            if (offset == 0) {
                res.render("index.ejs", {
                    result: result,
                    categories: categories
                })
            } else {
                res.render("admin/articles/page.ejs", {
                    result: result,
                    categories: categories
                })
            }
        })
    } else {
        Category.findAll().then(categories => {
            res.render("admin/categories/page.ejs", {
                result: result,
                categories: categories
            })
        })
    }
})
// Route to article pagination filtered by category - end

// Route to an article- begin
router.get("/:slug", async (req, res) => {
    var slug = req.params.slug
    await Article.findOne({
        where: {
            slug: slug
        }
    }).then(async article => {
        if (article != undefined) {
            await Category.findAll().then(categories => {
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
// Route to an article- end

module.exports = router