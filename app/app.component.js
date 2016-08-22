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
var router_1 = require('@angular/router');
var case_service_1 = require('./cases/case.service');
var casefile_service_1 = require('./casefiles/casefile.service');
var property_service_1 = require('./properties/property.service');
var requester_service_1 = require('./requesters/requester.service');
var authentication_service_1 = require('./authentication/authentication.service');
var login_component_1 = require('./authentication/login.component');
var is_loggedin_1 = require('./authentication/is-loggedin');
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //if (!isLoggedin()) {this.router.navigateByUrl('login');}
        setTimeout(function () { if (!is_loggedin_1.isLoggedin()) {
            _this.router.navigateByUrl('login');
        } }, 500);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, login_component_1.LoginComponent],
            providers: [
                property_service_1.PropertyService,
                requester_service_1.RequesterService,
                case_service_1.CaseService,
                casefile_service_1.CasefileService,
                authentication_service_1.AuthenticationService
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//     links: string[] = [];
//
//     constructor(){
//         this.resetLinks();
//     }
//
//     ngOnChanges(changes: {[propName: string]: SimpleChange}) {
//         console.log('ngOnChanges - myProp = ' + changes['myProp'].currentValue);
//         this.resetLinks();
//     }
//
//     resetLinks(){
//         if (isLoggedin()) {
//             this.links.length = 0;
//             this.links.push('logout');
//             this.links.push('workbench');
//         }
//         else {
//             this.links.length = 0;
//             this.links.push('login');
//         }
//     }
// }
//# sourceMappingURL=app.component.js.map