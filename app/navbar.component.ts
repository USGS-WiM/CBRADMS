import {Component, OnInit} from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AuthenticationService} from './authentication/authentication.service';

import {isLoggedin}        from './authentication/is-loggedin';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, AuthenticationService]
})
export class NavbarComponent implements OnInit {
    hideNavbar:Boolean = false;
    first_name: string;
    last_name: string;

    constructor(public auth: AuthenticationService) {}

    ngOnInit() {
        this.hideNavbar = !isLoggedin();
        this.first_name = sessionStorage.getItem('first_name');
        this.last_name = sessionStorage.getItem('last_name');
    }

    onLogout() {
        this.auth.logout();
    }

}