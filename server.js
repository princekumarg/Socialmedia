const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const { ensureAuth, ensureGuest } = require('./middleware/auth');

//Use .env file in config folder
require('dotenv').config();

// Passport config
require('./config/passport')(passport);

//Connect to MongoDB
connectDB();

//Using EJS as template engine
app.set('view engine', 'ejs');

//Static folder
app.use(express.static('public'));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger('dev'));

//Use forms for put /delete
app.use(methodOverride('_method'));

//Setup Session -stored in MongoDb
app.use(session({
    secret: 'Key Board',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_STRING,
        ttl: 14 * 24 * 60 * 60 // 14 days
    }),
    cookie: { maxAge: 180 * 60 * 1000 } // 3 hours
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors ,info ect...
app.use(flash());

//Setup Routes
app.use('/', mainRoutes);
app.use('/post', ensureAuth, postRoutes);
app.use('/comment', commentRoutes)

//Server running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})