// get dependencies
const express = require ('express');
const bodyParser = require ('body-parser');

const app = express();

// Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// parse requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// configuring the database
const config = require ('./config');
const mongoose = require ('mongoose');
require('./routes/product.routes')(app); 

mongoose.Promise = global.Promise;

//Connectiong to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// default route
app.get('/', (req, res) => {
    res.json({"message": "welcome to my product app"})
});

// listen on port 3000
app.listen(config.serverport, () => {
    console.log("Server listening on port 3000");
});