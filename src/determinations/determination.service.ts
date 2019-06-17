
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Determination} from './determination';


import {APP_SETTINGS} from '../app.settings';

@Injectable()
export class DeterminationService {
    constructor (private http: HttpClient) {}

    getDetermination (id: number | string) {
        const options = { headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS };

        return this.http.get(APP_SETTINGS.DETERMINATIONS_URL + id + '/', options)
            .map(res => <Determination> res)
            .catch(this.handleError);
    }

    getDeterminations (searchArgs?: URLSearchParams) {
        const options = { headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, search: searchArgs };

        return this.http.get(APP_SETTINGS.DETERMINATIONS_URL, options)
            .map(res => <Determination[]> res)
            .catch(this.handleError);
    }

    private handleError (error: Response) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return observableThrowError(error.json() || 'Server error');
    }
}
