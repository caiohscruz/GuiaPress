// import and instance express
const express = require("express")
const router = express.Router()

// import User model
const Category = require("./User")

// Route to users adm page - begin
router.get("/admin/users", (req, res) =>{
    res.send("usuários")
})
// Route to users adm page - begin

// Route to sign up page - begin
router.get("/admin/users/create", (req, res) =>{
    res.render("admin/users/new.ejs")
})
// Route to sign up page - end

// Route to save a user - begin
router.post("/categories/save", (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    if (title != undefined) {
        User.create({
            username: username,
            password: password,
            email: email
        }).then(() => {
            res.redirect("/admin/categories")
        })
    } else {
        res.redirect("admin/categories/new")
    }
})
// Route to save a user - end

module.exports = router