import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not Permitted');
}

const router = Router();

router.post('/login', (request: RequestWithBody, response: Response) => {
  const { email, password } = request.body;

  if (email && password && email === 'email' && password === 'pass') {
    //mark as signed in
    request.session = { loggedIn: true };

    //redirect them to the root route
    response.redirect('/');
  } else {
    response.send('Invalid email or Password');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
      <div> You Are Logged In </div>
      <a href="/logout">Logout</a>
    </div>
    `);
  } else {
    res.send(`
    <div>
      <div> You Are NOT Logged In </div>
      <a href="/login">Login here</a>
    </div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = null;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
  Welcome to protected route logged in user.
  `);
});

export { router };
