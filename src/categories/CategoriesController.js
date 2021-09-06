// import and instance express
const express = require("express")
const router = express.Router()

// import Category model
const Category = require("./Category")

// slugify transform a string replacing spaces and special characters
const slugify = require("slugify")

const adminAuth = require("../middlewares/adminAuth")

// Route to new category page - begin
router.get("/admin/categories/new", (req, res) => {
    var user = req.session.user.id

    if (user != 1) {
        res.redirect("/admin/articles")
    } else {
        res.render("admin/categories/new.ejs")
    }

})
// Route to new category page - end

// Route to save a category - begin
router.post("/categories/save", adminAuth, (req, res) => {
    var title = req.body.title
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories")
        })
    } else {
        res.redirect("admin/categories/new")
    }
})
// Route to save a category - end

// Route to delete a category - begin
router.post("/categories/delete", adminAuth, (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories")
            })
        } else {
            res.redirect("/admin/categories")
        }
    } else {
        res.redirect("/admin/categories")
    }
})
// Route to delete a category - end

// Route to edit category page - begin
router.get("/admin/categories/edit/:id", adminAuth, async (req, res) => {
    var id = req.params.id
    var user = req.session.user.id

    if (user != 1) {
        res.redirect("/admin/articles")
    }

    if (!isNaN(id)) {
        await Category.findByPk(id).then(category => {
            if (category != undefined) {
                res.render("admin/categories/edit.ejs", {
                    category: category
                })
            } else {
                res.redirect("/admin/categories")
            }
        }).catch(erro => {
            res.redirect("/admin/categories")
        })
    } else {
        res.redirect("/admin/categories")
    }
})
// Route to edit category page - end

// Route to update a category - begin
router.post("/categories/update", adminAuth, (req, res) => {
    var id = req.body.id
    var title = req.body.title

    Category.update({
        title: title,
        slug: slugify(title)
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories/")
    })
})
// Route to update a category - end

// Route to categories page - begin
router.get("/admin/categories/", adminAuth, async (req, res) => {
    var user = req.session.user.id

    if (user != 1) {
        res.redirect("/admin/articles")
    }

    await Category.findAll({
        raw: true,
        order: [
            ['title', 'ASC']
        ]
    }).then(categories => {
        res.render("admin/categories/index.ejs", {
            categories: categories
        })
    })
})
// Route to categories page - end

// exports router
module.exports = router