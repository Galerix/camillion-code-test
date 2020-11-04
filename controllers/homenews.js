'use-strict'

var moment = require('moment');
var mongoosePagination = require('mongoose-pagination');

var HomeNews = require('../models/homenews');

/*
* POST news function
*/
function saveNews(req, res) {
    //getting the params from the request
    var params = req.body;

    var homeNews = new HomeNews();

    //checking that the parameters have been entered
    if (!params.text || !params.name) {
        let data = { error: true, errorMessage: "You must send a text and the name of the news." }
        return res.status(200).send(data);
    }

    //checking that the user is admin
    if (req.user.role != "ROLE_ADMIN") {
        let data = { error: true, errorMessage: "You must be an admin to post news." }
        return res.status(401).send(data);
    }

    //saving the data in the user model
    homeNews.text = params.text;
    homeNews.name = params.name;
    homeNews.user = req.user.sub;
    homeNews.created_at = moment().unix();

    //saving the news in the database
    homeNews.save((err, homeNewsStored) => {

        //checking errors
        if (err) {
            let data = { error: true, errorMessage: err.message };
            res.status(500).send(data);
        }

        if (!homeNewsStored) {
            let data = { error: true, errorMessage: "The news has not been saved." };
            res.status(404).send(data);
        }

        //sending the response with the user itself
        return res.status(200).send({ homeNews: homeNewsStored });
    })

}

/*
* GET news function
*/
function getNews(req, res) {
    //default page 1
    var page = 1;
    //checking if a page has been passed by parameter
    if (req.params.page) {
        page = parseInt(req.params.page);
    }
    var itemsPerPage = 4;

    //getting the news from the database
    HomeNews.find()
        .paginate(page, itemsPerPage, (err, homeNews, total) => {

            //checking errors
            if (err) {
                let data = { error: true, errorMessage: err.message };
                res.status(500).send(data);
            }
            if (!homeNews) {
                let data = { error: true, errorMessage: "There is no news." };
                res.status(404).send(data);
            }

            //sending the response with the total of news, the actual page, the total of pages and the news of the page
            return res.status(200).send({
                total: total,
                page: page,
                pages: Math.ceil(total / itemsPerPage),
                homeNews
            });
        })


}

//exporting the functions
module.exports = {
    saveNews,
    getNews
}