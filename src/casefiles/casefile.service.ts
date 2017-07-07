import {Injectable} from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import {AuthenticationService} from '../authentication/authentication.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {APP_SETTINGS} from '../app.settings';

@Injectable()
export class CasefileService {
    constructor (private http: Http, private _authenticationService: AuthenticationService) {}

    getCasefiles (searchArgs?: URLSearchParams) {
        const options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs });

        return this.http.get(APP_SETTINGS.CASEFILES_URL, options)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    createCasefiles(caseid: number, files: Array<File>, final_letter?: Boolean) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < files.length; i++) {
                const formData: any = new FormData();
                formData.append('case', caseid);
                formData.append('file', files[i]);
                if (final_letter) {
                    formData.append('final_letter', final_letter);
                }
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 201) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                };
                xhr.open('POST', APP_SETTINGS.CASEFILES_URL, true);
                xhr.setRequestHeader('Authorization', 'Basic '
                    + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')));
                xhr.send(formData);
            }
        });
    }

    deleteCasefile(casefileid: number) {
        const options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

        return this.http.delete(APP_SETTINGS.CASEFILES_URL + casefileid + '/', options);
    }

    private handleError (error: any) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error via Casefile Service');
    }
}
