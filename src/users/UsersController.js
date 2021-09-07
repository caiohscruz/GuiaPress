// import and instance express
const express = require("express")
const router = express.Router()

// import User model
const User = require("./Users")

// to protect users password
const bcrypt = require("bcryptjs")

const adminAuth = require("../middlewares/adminAuth")

// Route to users adm page - begin
router.get("/admin/users/", adminAuth, async (req, res) => {
    await User.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(users => {
        res.render("admin/users/index.ejs", {
            users: users
        })
    })
})
// Route to users adm page - end

// Route to sign up page - begin
router.get("/admin/users/new", (req, res) => {
    res.render("admin/users/new.ejs")
})
// Route to sign up page - end

// Route to save a user - begin
router.post("/users/save", async (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email

    // check if email already exists
    await User.findOne({
        where: {
            email: email
        }
    }).then(async user => {
        if (user != undefined) {
            res.redirect("/admin/users/new")
        } else {
            // protecting the password
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)

            if (username != undefined) {
                await User.create({
                    username: username,
                    password: hash,
                    email: email
                }).then(() => {
                    res.redirect("/")
                }).catch(erro => {
                    res.redirect("/admin/users/new")
                })
            } else {
                res.redirect("admin/users/new")
            }
        }
    })
})
// Route to save a user - end

// route to login page - begin
router.get("/login", (req, res) => {
    res.render("admin/users/login.ejs")
})
// route to login page - end

// route to authentication - begin
router.post("/authenticate", async (req, res) => {
    var email = req.body.email
    var password = req.body.password

    await User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user != undefined) {
            var correct = bcrypt.compareSync(password, user.password)
            if (correct) {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
                res.redirect("/admin/articles")
            } else {
                res.redirect("/")
            }
        } else {
            res.redirect("/")
        }
    })
})
// route to authentication - end

// route to logout - begin
router.get("/logout", (req, res) =>{
    req.session.destroy()
    res.redirect("/")
})
// route to logout - end

module.exports = router