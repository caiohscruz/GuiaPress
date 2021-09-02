const express = require("express")
const router = express.Router()

const Category = require("./Category")

const slugify = require("slugify")

router.get("/categories", (req,res) => {
    res.send("teste")
})

// Form para criar categories
router.get("/admin/categories/new", (req,res) => {
    res.render("admin/categories/newCategory.ejs")
})

// Salvar categories
router.post("/categories/save", (req,res) => {
    var title = req.body.title
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=> {
            res.redirect("/")
        })
    }else{
        res.redirect("admin/categories/newCategory.ejs")
    }
})

module.exports = router