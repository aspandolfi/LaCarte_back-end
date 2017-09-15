"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const HeroRouter_1 = require("./routes/HeroRouter");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Photo_1 = require("./entity/Photo");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/heroes', HeroRouter_1.default);
    }
}
typeorm_1.createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "test",
    entities: [
        __dirname + "/entity/*.js"
    ],
    autoSchemaSync: true,
}).then(connection => {
    // Here you can start to work with your entities
    let photo = new Photo_1.Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;
    return connection.manager
        .save(photo)
        .then(photo => {
        console.log("Photo has been saved");
    });
}).catch(error => console.log(error));
exports.default = new App().express;
