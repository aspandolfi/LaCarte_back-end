import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import HeroRouter from './routes/HeroRouter';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Photo} from "./entity/Photo";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
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
    this.express.use('/api/v1/heroes', HeroRouter);
  }

}
  createConnection({
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
      let photo = new Photo();
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

export default new App().express;