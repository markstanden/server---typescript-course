"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loginRoutes_1 = require("./routes/loginRoutes");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_session_1.default({ keys: ['pintpintpint'] }));
app.use(loginRoutes_1.router);
app.listen(3000, function () {
    console.log('Listening on Port 3000');
});
// ASIDE ON DECORATORS
var Boat = /** @class */ (function () {
    function Boat() {
        this.color = 'red';
    }
    Object.defineProperty(Boat.prototype, "formattedColor", {
        get: function () {
            return "This boats color is " + this.color;
        },
        enumerable: false,
        configurable: true
    });
    Boat.prototype.pilot = function () {
        throw new Error('Consider the error thrown');
        console.log('Swish');
    };
    __decorate([
        logError('Boat was sunk, oh no.'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Boat.prototype, "pilot", null);
    return Boat;
}());
function logError(errorMessage) {
    return function (target, key, desc) {
        // console.log('Target:', target);
        // console.log('Key: ', key);
        // console.log('Descriptor: ', desc);
        var method = desc.value;
        desc.value = function () {
            try {
                method();
            }
            catch (e) {
                console.log(errorMessage);
            }
        };
    };
}
new Boat().pilot();
