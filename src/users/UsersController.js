// import and instance express
const express = require("express")
const router = express.Router()

// import User model
const User = require("./User")

// to protect users password
const bcrypt = require("bcryptjs")

// Route to users adm page - begin
router.get("/admin/users/", async (req, res) => {
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
                    res.redirect("/")
                })
            } else {
                res.redirect("admin/users/new")
            }
        }
    })
})
// Route to save a user - end

router.get("/login", (req, res) => {
    res.render("admin/users/login.ejs")
})

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
                    email: user.email
                }
                res.redirect("/")
            } else {
                res.redirect("/login")
            }
        } else {
            res.redirect("/login")
        }
    })
})


module.exports = router