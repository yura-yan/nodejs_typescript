import dotenv from 'dotenv';
import log4js from 'log4js';
import express, { Express, RequestHandler } from 'express';
import httpContext from 'express-http-context';
import { useExpressServer } from 'routing-controllers';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import config from 'config';
import * as swaggerDocument from './swagger/openapi.json';
import { UserController } from './controller/user-controller';
import { GlobalErrorHandler } from './middleware/global-error-handler';

const app: Express = express();

app.use(cors() as RequestHandler);
app.use(express.json());
app.use(httpContext.middleware);
useExpressServer(app, {
  controllers: [UserController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false,
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
});

dotenv.config();
// const port = process.env.PORT;
const port = config.get('PORT');

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

/* const app = createExpressServer({
  controllers: [UserController], // we specify controllers we want to use
}); */

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
