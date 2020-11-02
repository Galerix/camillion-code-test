'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomeNewsSchema = Schema({
    name: String,
    text: String,
    created_at: String,
    user: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('HomeNew', HomeNewsSchema);