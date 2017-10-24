import { urlencoded } from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { useContainer as useContainerClassValidator } from 'class-validator';
import { useContainer, useExpressServer, Action } from 'routing-controllers';
import { Container } from 'typedi';
import { UserController, CardapioController } from '../controllers';
import { ClienteService } from '../entities/cliente';
import Auth from '../config/passport';

useContainer(Container);

useContainerClassValidator(Container);

const config: express.Application = express();

config
  .use(morgan('dev'))
  .use(helmet())
  .use(Auth.initialize())
  .use(urlencoded({
    extended: true
  }));

const app: express.Application = useExpressServer(config, {
  controllers: [
    UserController,
    CardapioController
  ],
  authorizationChecker: async (action: Action, roles: string[]) => {

    const token = action.request.headers["authorization"];

    const user = await Container.get(ClienteService).findOneByToken(token);
    if (user /*&& !roles.length*/)
      return true;
    // if (user && roles.find(role => user.roles.indexOf(role) !== -1))
    //   return true;

    return false;
  },
  routePrefix: '/api/v1',
  validation: true
});

export { app };
