const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
require('dotenv').config()

const app = express()
app.use(express.static(__dirname + '/public'));

// Passport config
require('./config/passport')(passport)

// DB

const db = process.env.mongoURI

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))


    // MIDDLEWARE

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')


// bodyparser
app.use(express.urlencoded({ extended: true }))

// Express sesison
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// connect flash
app.use(flash())

// Globals
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`Server running on port ${PORT}`))