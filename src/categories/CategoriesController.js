const express = require("express")
const router = express.Router()

router.get("/categories", (req,res) => {
    res.send("teste")
})

router.get("/admin/categories/new", (req,res) => {
    res.send("")
})

module.exports = router