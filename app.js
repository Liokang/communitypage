const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs=require("ejs");
const path = require('path');
const port = 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Routes
const routes = require('./routes/index');
app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`listening on port:${port}`);
});
