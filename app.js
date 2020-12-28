//const a=1+1;
//console.log("Bonjour le monde", a);
// https://www.npmjs.com/package/express-mongoose-generator
const express = require('express');

// instance de notre application. 
//Elle possede dans ses proprietes un objet Router sur lequel on devra greffer nos route
var app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())

//Demarrage du serveur HTTP
app.listen(port, () => {
    console.log('App listening on port 3000!');
});

//importation des routes en passant l instance de notre 
// application afin que ces routes y soient greffees
require('./routes')(app);

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile)
app.set("view engine", "html");


app.get('/', (req, res) =>{
   // res.send("Bienvenue à l'accueil");
    res.render('home/connexion.html');
    //res.render('home/recovery_password.html');
});



// // Linking Routes to our server

// var users = require('./routes/usersRoutes');
// app.use('/users', users);
