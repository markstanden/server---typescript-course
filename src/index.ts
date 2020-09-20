import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app: express.Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['pintpintpint'] }));
app.use(router);

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});

// ASIDE ON DECORATORS

class Boat {
  color: string = 'red';

  get formattedColor(): string {
    return `This boats color is ${this.color}`;
  }

  @logError('Boat was sunk, oh no.')
  pilot(): void {
    throw new Error('Consider the error thrown');
    console.log('Swish');
  }
}

function logError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    // console.log('Target:', target);
    // console.log('Key: ', key);
    // console.log('Descriptor: ', desc);
    const method = desc.value;
    desc.value = function () {
      try {
        method();
      } catch (e) {
        console.log(errorMessage);
      }
    };
  };
}

new Boat().pilot();
