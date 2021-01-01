const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const { checkAuth } = require('../config/auth')
const Entry = require('../models/Entry')

// GET

router.get('/', (req, res) => res.render('welcome'))

router.get('/home', checkAuth, (req, res) => {
    res.render('home', {
        name: req.user.username
    })
})

router.get('/new', checkAuth, (req, res) => {
    res.render('new', { name: req.user.username})
})

router.get('/results', checkAuth, (req, res) => {
    res.render('results', { name: req.user.username})
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

// find all tags and make a list with only unique items
router.get('/tags', checkAuth, async (req, res) => {
    const tagsList = []
    let uniqueTags = []
    try {
        const entries = await Entry.find({ author: req.user._id })
        for (let i = 0; i < entries.length; i++) {
            if ('tags' in entries[i]) {
               entries[i].tags.forEach(item => {
                    item = item.trim()
                    tagsList.push(item)
                    const uniques = new Set(tagsList)
                    uniqueTags = [...uniques]
               })      
            }
        }
        res.render('tags', { name: req.user.username, uniqueTags })
    }
    catch (err) {
        console.log(err)
    }
    
})

router.get('/resultsbytag', async (req, res) => {
    res.render('tags', { name: req.user.username, resultsByTag })
})

//POST

// query for posts with search string
router.post('/search', async (req, res) => {
   const results = await Entry.find({ 
       author: req.user._id, 
       description: new RegExp(req.body.search, 'i') 
    })
    res.render('results', { name: req.user.username, results })
})


// TODO: figure this out
router.post('/searchbytag', async (req, res) => {
    const resultsByTag = await Entry.find({
        author: req.user._id,
        tags: {$in: [req.body.tag] }
    })

    res.render('resultsbytag', { name: req.user.username, selectedTag: req.body.tag, resultsByTag })
})

// add an entry, put tags into an array
router.post('/add', async (req, res) => {
    let tagsString = req.body.tags
    let tags = tagsString.trim()
    let tagsArr = tags.split(',')

    const newEntry = new Entry({
        title: req.body.title,
        description: req.body.description,
        tags: tagsArr,
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