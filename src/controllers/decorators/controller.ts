import { Methods } from './Methods';
import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';

export function controller(rootRoute: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata('path', target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );

      if (path) {
        router[method](`${rootRoute}${path}`, routeHandler);
      }
    }
  };
}
