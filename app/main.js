"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_routes_1 = require('./app.routes');
var app_component_1 = require('./app.component');
var authentication_service_1 = require('./authentication/authentication.service');
require('rxjs/Rx');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    app_routes_1.APP_ROUTER_PROVIDERS,
    authentication_service_1.AuthenticationService,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms()
])
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map