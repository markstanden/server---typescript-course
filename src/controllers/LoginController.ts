import { NextFunction, Request, Response } from 'express';
import { get, controller, bodyValidator, post } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    console.log('LoginController');
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

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(request: Request, response: Response): void {
    const { email, password } = request.body;

    if (email && password && email === 'email' && password === 'pass') {
      //mark as signed in
      request.session = { loggedIn: true };
      //redirect them to the root route
      response.redirect('/');
    } else {
      response.send('Invalid email or Password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = null;
    res.redirect('/');
  }
}
