"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/login', function (request, response) {
    response.send("\n    <form method = \"POST\" >\n    <div>\n      <label>Email</label>\n      <input name=\"email\" />\n    </div>\n    <div>\n      <label>Password</label>\n      <input name=\"password\" type=\"password\" />\n    </div>\n    <button>Submit</button>\n  ");
    router.post('/login', function (request, response) {
        var _a = request.body, email = _a.email, password = _a.password;
        if (email && password && email === 'a@b.com' && password === 'c') {
            //mark as signed in
            request.session = { loggedIn: true };
            //redirect them to the root route
            response.redirect('/');
        }
        else {
            response.send('Invalid email or Password');
        }
    });
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n    <div>\n      <div> You Are Logged In </div>\n      <a href=\"/logout\">Logout</a>\n    </div>\n    ");
    }
    else {
        res.send("\n    <div>\n      <div> You Are NOT Logged In </div>\n      <a href=\"/login\">Login here</a>\n    </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
});
