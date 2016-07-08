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
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var http_1 = require('@angular/http');
var app_settings_1 = require('../app.settings');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var options = new http_1.RequestOptions({ headers: new http_1.Headers({ "Authorization": "Basic " + btoa(username + ":" + password) }) });
        return this.http.post(app_settings_1.APP_SETTINGS.AUTH_URL, null, options)
            .map(function (res) {
            _this.user = res.json();
            if (_this.user.is_staff) {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('password', password);
                sessionStorage.setItem('first_name', _this.user.first_name);
                sessionStorage.setItem('last_name', _this.user.last_name);
                sessionStorage.setItem('email', _this.user.email);
                sessionStorage.setItem('is_staff', _this.user.is_staff.toString());
            }
            else {
                // TODO: do something more professional here
                alert('This user is not authorized!');
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        this.user = undefined;
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('first_name');
        sessionStorage.removeItem('last_name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('is_staff');
        return Observable_1.Observable.of(true);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map