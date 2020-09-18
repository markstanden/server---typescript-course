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
        if (email && password && email === 'hi@hi.com' && password === 'password') {
            response.send('ok');
            //mark as signed in
            //redirect them to the root route
        }
        else {
            response.send('Invalid email or Password');
        }
    });
});
