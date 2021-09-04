// import and instance express
const express = require("express")
const router = express.Router()

// import User model
const User = require("./User")

// to protect users password
const bcrypt = require("bcryptjs")

// Route to users adm page - begin
router.get("/admin/users", (req, res) => {
    res.send("usuários")
})
// Route to users adm page - begin

// Route to sign up page - begin
router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/new.ejs")
})
// Route to sign up page - end

// Route to save a user - begin
router.post("/users/save", (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email

    // check if email already exists
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user != undefined) {
            res.redirect("/admin/users/create")
        } else {
            // protecting the password
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)

            if (username != undefined) {
                User.create({
                    username: username,
                    password: hash,
                    email: email
                }).then(() => {
                    res.redirect("/")
                }).catch(erro => {
                    res.redirect("/")
                })
            } else {
                res.redirect("admin/users/new")
            }
        }
    })
})
// Route to save a user - end

module.exports = router