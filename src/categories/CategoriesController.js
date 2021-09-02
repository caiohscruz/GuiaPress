const express = require("express")
const router = express.Router()

const Category = require("./Category")

const slugify = require("slugify")

router.get("/categories", (req, res) => {
    res.send("teste")
})

// Form para criar categories
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/newCategory.ejs")
})

// Salvar categories
router.post("/categories/save", (req, res) => {
    var title = req.body.title
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/")
        })
    } else {
        res.redirect("admin/categories/newCategory.ejs")
    }
})
// Deletar categoria
router.post("/categories/delete", (req, res) => {
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

// Form para listar categories
router.get("/admin/categories/", async (req, res) => {
    await Category.findAll({
        raw: true,
        order: [
            ['id', 'ASC']
        ]
    }).then(categories => {
        res.render("admin/categories/indexCategory.ejs", {
            categories: categories
        })
    })
})

module.exports = router