'use strict'

var mongoose = require('mongoose');
const app = require('./app');
const DB_URI = 'mongodb://localhost:27017/camilliondb';

const PORT = process.env.PORT || 3800;

//database conexion
function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then((res, err) => {
                if (err) return reject(err);
                resolve();
                console.log("The connection to the camillion database was successful.");
                app.listen(PORT, () => {
                    console.log("Server running on http://localhost:" + PORT);
                })
            })
    })
}

function close() {
    return mongoose.disconnect();
}


module.exports = { connect, close };
