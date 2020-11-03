'user strict'

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var app = express();

let port = 3080;
let config = require('config'); //we load the db location from the JSON files
let options = {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
};

//db connection
mongoose.connect(config.DBHost, options).then(() => {
    console.log("The connection to the camillion database was successful.")
})
    .catch(err => console.log(err));;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}


//load routes
var news_routes = require('./routes/homenews');

//parse application/json and look for raw text
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//routes
app.use('/api', news_routes);

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});
console.log("Listening on port " + port);

//export
module.exports = app;
