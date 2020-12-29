const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

// User model
const User = require('../models/User')


// GET
router.get('/login', (req, res) => res.render('login'))

router.get('/register', (req, res) => res.render('register'))

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You have successfully logged out')
    res.redirect('/users/login')
})

// POST

router.post('/register', (req, res) => {
    const { username, password, password2 } = req.body

    let signupErrors = []

    if (!username || !password || !password2) {
        signupErrors.push({ msg: 'Please fill in all fields'})
    }
    if (username.length < 3) {
        signupErrors.push({ msg: 'Username has to be at least 3 characters'})
    }
    if (password !== password2) {
        signupErrors.push({ msg: 'Passwords do not match' })
    }
    if (password.length < 8) {
        signupErrors.push({ msg: 'Password has to be minimum 8 characters' })
    }
    if (signupErrors.length > 0) {
        res.render('register', {
            signupErrors,
            username, password, password2
        })
    }
    else {
        User.findOne({ username: username })
        .then(user => {
            if(user) {
                signupErrors.push({ msg: 'Username already registered' })
                res.render('register', { signupErrors, username, password, password2 })
            }
            else {
                const newUser = new User({
                    username, password
                })

                // hash pw

                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err

                        newUser.password = hash
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered')
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    }))
            }
        })
    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { 
        successRedirect: '/home',
        failureRedirect: '/users/login',
        failureFlash: true
     })(req, res, next)
})




module.exports = router