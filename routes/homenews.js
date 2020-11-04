'use strict'

var express = require('express');
var HomeNewsController = require('../controllers/homenews');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/news', md_auth.ensureAuth, HomeNewsController.saveNews);
api.get('/news/:page?', md_auth.ensureAuth, HomeNewsController.getNews);

module.exports = api;