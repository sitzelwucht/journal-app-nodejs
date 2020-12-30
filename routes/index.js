const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const { checkAuth } = require('../config/auth')
const Entry = require('../models/Entry')

router.get('/', (req, res) => res.render('welcome'))

router.get('/home', checkAuth, (req, res) => {
    res.render('home', {
        name: req.user.username
    })
})

router.get('/new', checkAuth, (req, res) => {
    res.render('new', { name: req.user.username})
})

router.get('/archive', checkAuth, async (req, res) => {
    try {
        const entries = await Entry.find({ author: req.user._id })
        res.render('archive', { name: req.user.username, entries })
    }
    catch (err) {
        console.log(err)
    }
})

// TODO
router.get('/search', async (req, res) => {
    const results = await Entry.find({ tags: req.body.tags })
    res.render('results', { name: req.user.username, results })
})

router.post('/add', async (req, res) => {
    const newEntry = new Entry({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        author: req.user._id
    })

    try {
        const savedEntry = await newEntry.save()
        res.redirect('/archive')
    }
    catch (err) {
        console.log(err)
    }

})

module.exports = router