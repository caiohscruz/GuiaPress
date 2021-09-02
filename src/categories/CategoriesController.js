const express = require("express")
const router = express.Router()

router.get("/categories", (req,res) => {
    res.send("teste")
})

// Form para criar categories
router.get("/admin/categories/new", (req,res) => {
    res.render("admin/categories/new.ejs")
})

module.exports = router