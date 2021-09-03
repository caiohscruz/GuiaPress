const express = require("express")
const router = express.Router()

const Category = require("./Category")

const slugify = require("slugify")

router.get("/categories", (req, res) => {
    res.send("teste")
})

// Form para criar categories
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new.ejs")
})

// Salvar categories
router.post("/categories/save", (req, res) => {
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
// Botão Editar categoria
router.post("/categories/edit", (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            res.redirect(`/admin/categories/edit/${id}`)
        } else {
            res.redirect("/admin/categories")
        }
    } else {
        res.redirect("/admin/categories")
    }
})
// Tela de Editar categories
router.get("/admin/categories/edit/:id", async (req, res) => {
    var id = req.params.id

    if(!isNaN(id)){
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
    }else{
        res.redirect("/admin/categories")        
    }
})
// Tela listagem de categorias
router.get("/admin/categories/", async (req, res) => {
    await Category.findAll({
        raw: true,
        order: [
            ['id', 'ASC']
        ]
    }).then(categories => {
        res.render("admin/categories/index.ejs", {
            categories: categories
        })
    })
})

module.exports = router