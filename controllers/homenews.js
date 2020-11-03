'use-strict'

var moment = require('moment');
var mongoosePagination = require('mongoose-pagination');

var HomeNews = require('../models/homenews');

function saveNews(req, res) {
    var params = req.body;
    var homeNews = new HomeNews();

    if (!params.text || !params.name) {
        let data = { error: true, errorMessage: "You must send a text and the name of the news." }
        return res.status(200).send(data);
    }

    if (req.user.role != "ROLE_ADMIN") {
        let data = { error: true, errorMessage: "You must be an admin to post news." }
        return res.status(401).send(data);
    }

    homeNews.text = params.text;
    homeNews.name = params.name;
    homeNews.user = req.user.sub;
    homeNews.created_at = moment().unix();

    homeNews.save((err, homeNewsStored) => {

        if (err) {
            let data = { error: true, errorMessage: err.message };
            res.status(500).send(data);
        }

        if (!homeNewsStored) {
            let data = { error: true, errorMessage: "The news has not been saved." };
            res.status(404).send(data);
        }

        return res.status(200).send({ homeNews: homeNewsStored });
    })

}

module.exports = {
    saveNews
}