import { Methods } from './Methods';
import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { MetadataKeys } from './MetadataKeys';
import { Request, Response, RequestHandler, NextFunction } from 'express';

function bodyValidators(keys: string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction){
    if (!req.body) {
      res.status(422).send('Invalid Request (No Body)');
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Invalid Request (Missing Keys)')
      }
    }

  }
}

export function controller(rootRoute: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares = Reflect.getMetadata(
        MetadataKeys.middleware,
        target.prototype,
        key
        ) || [];

      const requiredBodyProps = Reflect.getMetadata(
        MetadataKeys.validator,
        target.prototype,
        key
        ) || [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](`${rootRoute}${path}`, ...middlewares, validator ,routeHandler);
      }
    }
  };
}
