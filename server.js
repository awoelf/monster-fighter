// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session')
const path = require('path');
require('dotenv').config();

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session({
    // secret: process.env.SESS_SECRET,
    secret: "lo#cos#ih-z0g#$3%@0v1z@g&8u756#b@_=yq%q5kk1$flj=v-",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
})