import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/login', (request: Request, response: Response) => {
  response.send(`
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

  router.post('/login', (request: RequestWithBody, response: Response) => {
    const { email, password } = request.body;

    if (email && password && email === 'a@b.com' && password === 'c') {
      //mark as signed in
      request.session = { loggedIn: true };

      //redirect them to the root route
      response.redirect('/');
    } else {
      response.send('Invalid email or Password');
    }
  });
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

export { router };
