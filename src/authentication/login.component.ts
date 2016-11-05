import {Component} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    form: FormGroup;
    error: boolean = false;
    constructor(fb: FormBuilder, public auth: AuthenticationService, public router: Router) {
        this.form = fb.group({
            username:  ['', Validators.required],
            password:  ['', Validators.required]
        });
    }

    onSubmit(value: any) {
        if (sessionStorage.getItem('username')) {this.auth.logout();}
        this.auth.login(value.username, value.password)
            .subscribe(
                (user: any) => this.router.navigateByUrl('workbench'),
                () => { this.error = true; }
            );
    }
}
