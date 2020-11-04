# CAMILLION CODE TEST

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
    * [User Stories](#user-stories)
        * [Post a news item](#post-a-news-item)
        * [Get home news](#get-home-news)
* [Tests](#tests)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

This project is a code test for [Camillion](https://www.camillion.app/) to evaluate my programming skills. The project consists of an API to feed a home of news about their platform.
The test consists of two main user stories, one to create news and the other one to show those news in the feed.

### Built With

The project has been built in [NodeJS](https://nodejs.org/es/). The database has been stored in [MongoDB](https://www.mongodb.com/).

Here the most important used libraries and frameworks.
* [Express](https://expressjs.com/es/)
* [Mongoose](https://mongoosejs.com/)
* [Body-Parser](https://www.npmjs.com/package/body-parser)



<!-- GETTING STARTED -->
## Getting Started

Only a few things are needed to start using the project.

### Prerequisites

- #### Node
If you don't have node installed on your pc you should do it by downloading the installer [here](https://nodejs.org/en/download/).

- #### npm
If you don't have npm installed on your pc you should do it with this command.
```sh
npm install npm@latest -g
```

- #### MongoDB
If you don't have mongodb installed on your pc you should do it following the steps in the [official guide](https://docs.mongodb.com/manual/installation/).

### Installation

1. Clone the repo
```sh
git clone https://github.com/Galerix/camillion-code-test.git
```
2. Install NPM packages in the project folder. (They are already included in the repository because I forgot to include the node_modules folder in the .gitignore but it would be convenient to run the command anyway to avoid errors.)
```sh
npm install
```





<!-- USAGE EXAMPLES -->
## Usage

The API runs on port 3080 by default, and the root can be accessed by navigating to http://localhost:3080/api.
```sh
npm start
```
#### User Stories
##### Post a news item
You can post a news item by making a POST request to http://localhost:3080/api/news passing it as parameters the name and the text. You need to write "admin" in the Authorization header otherwise you will not be able to post any news.
##### Get home news
You can get all home news by making a GET request to http://localhost:3080/api/news. The news will be ordered in pages, four news will appear per page (you can change the news per page) and you can select which page of the news by adding the number to the address in this way: http://localhost:3080/api/new/2. You need to write "admin" or "user" in the Authorization header otherwise you will not be able to get any news.

The functions can be found in ````controllers/homenews.js````.
<!-- TESTS -->
## Tests
To ensure the quality of the project I used [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) to perform unit tests, also I used [Travis](https://travis-ci.com/) for continuous integration, you can see the builds [here](https://travis-ci.com/github/Galerix/camillion-code-test).
```sh
npm run test
```
The tests can be found in ````test/homenews.js````.




<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

David Galera - [LinkedIn](https://www.linkedin.com/in/david-galera-rodriguez-47a65b1b6/) - dgalerarodriguez@gmail.com

Project Link: [https://github.com/Galerix/camillion-code-test](https://github.com/Galerix/camillion-code-test)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Body-Parser](https://www.npmjs.com/package/body-parser)
* [Config](https://www.npmjs.com/package/config)
* [Express](https://expressjs.com/es/)
* [Jwt-Simple](https://www.npmjs.com/package/jwt-simple)
* [Moment](https://momentjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [Mongoose-paginate](https://www.npmjs.com/package/mongoose-paginate-v2)
* [Morgan](https://www.npmjs.com/package/morgan)
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [Chai-http](https://www.chaijs.com/plugins/chai-http/)
* [Nodemon](https://nodemon.io/)
* [MongoDB](https://www.mongodb.com/)