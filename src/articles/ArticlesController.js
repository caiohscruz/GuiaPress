const express = require("express")
const router = express.Router()

const Category = require("../categories/Category")
const User = require("../users/Users")
const Article = require("./Article")
const slugify = require("slugify")

const adminAuth = require("../middlewares/adminAuth")

// Route to list articles - begin
router.get("/admin/articles", adminAuth, async (req, res) => {
    var userId = req.session.user.id
    var articles

    if (userId == 1) {
        articles = await Article.findAll({
            include: [{
                model: Category
            }],
            order: [
                ['id', 'DESC']
            ]
        })
    } else {
        articles = await Article.findAll({
            where: {
                userId: userId
            },
            include: [{
                model: Category
            }],
            order: [
                ['id', 'DESC']
            ]
        })
    }

    res.render("admin/articles/index.ejs", {
        articles: articles
    })

})

// Route to list articles - end

// Route to new article - begin
router.get("/admin/articles/new", adminAuth, async (req, res) => {
    await Category.findAll({
        order: [
            ["title", "ASC"]
        ]
    }).then(categories => {
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
    var userId = req.session.user.id

    if (title != undefined) {
        await Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: category,
            userId: userId
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
    var userId = req.session.user.id

    if (!isNaN(id)) {
        await Article.findByPk(id).then(async article => {
            if (article != undefined) {

                if ((userId != 1) && (userId != article.userId)) {
                    res.redirect("/admin/articles")
                }

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
router.get("/articles/page/:page", async (req, res) => {
    var page = req.params.page
    var offset = 0
    var quant = 4
    var slug = req.query.category
    var categoryId
    var articles

    if ((page == 1) && slug == undefined) {
        res.redirect("/")
    }

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
            ],
            include: [{
                model: User
            }, {
                model: Category
            }]
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
            ],
            include: [{
                model: User
            }, {
                model: Category
            }]
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

    Category.findAll({
        order: [
            ['title', 'ASC']
        ]
    }).then(categories => {
        res.render("admin/articles/page.ejs", {
            result: result,
            categories: categories
        })
    })

})
// Route to article pagination filtered by category - end

// Route to an article- begin
router.get("/read/:slug", async (req, res) => {
    var slug = req.params.slug
    await Article.findOne({
        where: {
            slug: slug
        },
        include: [{
            model: Category
        }, {
            model: User
        }]
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