// import and instance express
const express = require("express")
const router = express.Router()

// import Category model
const Category = require("./Category")

// slugify transform a string replacing spaces and special characters
const slugify = require("slugify")

// Route to new category page - begin
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new.ejs")
})
// Route to new category page - end

// Route to save a category - begin
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
// Route to save a category - end

// Route to delete a category - begin
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
// Route to delete a category - end

// Route to edit button - begin
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
// Route to edit button - end

// Route to edit category page - begin
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
// Route to edit category page - end

// Route to categories page - begin
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
// Route to categories page - end

// exports router
module.exports = router