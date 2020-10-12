import { NextFunction, Request, Response } from 'express';
import { get, controller, use } from './decorators';

// MIDDLEWARE TO REMOVE
function logger (req: Request, res: Response, next: NextFunction) {
  console.log('Request was made')
  next();
}
// *****************************

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger) // REMOVE ME TOO
  getLogin(req: Request, res: Response): void {

    console.log("LoginController");
    res.send(`
    <form method = "POST" >
    <div>
      <label>Email</label>
      <input name="email" />
    </div>
    <div>
      <label>Password</label>
      <input name="password" type="password" />
    </div>
    <button>Submit</button>
  `);
  }
}
