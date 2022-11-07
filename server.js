// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// Server not set up yet, so this is commented out
// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log(`Listening at https://localhost/${PORT}`));
// })

// Debugging
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
});