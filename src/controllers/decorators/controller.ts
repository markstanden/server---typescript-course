import { Methods } from './Methods';
import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { MetadataKeys } from './MetadataKeys';
import { Request, Response, RequestHandler, NextFunction } from 'express';

function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid Request (No Body)');
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Invalid Request (Missing Property:  ${key})`);
        return;
      }
    }
    next();
  };
}

export function controller(rootRoute: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      console.log(key);
      const routeHandler = target.prototype[key];
      console.log(routeHandler);
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      console.log('Path:', path);
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );
      console.log('Method: ', method);

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];
      console.log('Middlewares: ', middlewares);

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];
      console.log('requiredBodyProps: ', requiredBodyProps);

      const validator = bodyValidators(requiredBodyProps);
      console.log('validator: ', validator);

      if (path) {
        router[method](
          `${rootRoute}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
