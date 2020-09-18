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

    if (email && password && email === 'hi@hi.com' && password === 'password') {
      response.send('ok');
      //mark as signed in
      //redirect them to the root route
    } else {
      response.send('Invalid email or Password');
    }
  });
});

export { router };
