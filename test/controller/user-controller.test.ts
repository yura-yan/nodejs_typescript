import express from 'express';
import { useExpressServer } from 'routing-controllers';
import request from 'supertest';
import { UserController } from '../../src/controller/user-controller';
import { Info } from '../../src/model/info';
import { GlobalErrorHandler } from '../../src/middleware/global-error-handler';

describe('UserController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  let server;
  beforeAll(async () => {
    server = express();
    server.use(express.json());
    useExpressServer(server, {
      controllers: [UserController], // we specify controllers we want to use
      middlewares: [GlobalErrorHandler],
      defaultErrorHandler: false,
    });
  });

  it('postOne', () => {
    const userController = new UserController();
    const testBody = {
      country: 'Russia',
      city: 'SPb',
    };
    const res = userController.postOne(1, testBody as Info);
    expect(res).toBeUndefined();
  });

  it('postOne with validations', (done) => {
    request(server)
      .post('/users/1')
      .send({
        country: 'Russia',
        city: 'SPb',
      } as Info)
      .expect(204)
      .end((err, res) => {
        if (err) throw new Error(JSON.stringify(res.body));
        done();
      });
  });
});
