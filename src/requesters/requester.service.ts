
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Requester} from './requester';


import {APP_SETTINGS} from '../app.settings';

@Injectable()
export class RequesterService {
    constructor (private http: HttpClient) {}

    getRequester (id: number | string) {
        const options = { headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS };

        return this.http.get(APP_SETTINGS.REQUESTERS_URL + id + '/', options)
            .map(res => <Requester> res)
            .catch(this.handleError);
    }

    getRequesters (searchArgs?) {
        const options = { headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS, params: searchArgs };

        return this.http.get(APP_SETTINGS.REQUESTERS_URL, options)
            .map(res => <Requester[]> res)
            .catch(this.handleError);
    }

    createRequester (requester: Requester): Observable<Requester> {
        const body = JSON.stringify(requester);
        const options = { headers: APP_SETTINGS.AUTH_JSON_HEADERS };

        return this.http.post(APP_SETTINGS.REQUESTERS_URL, body, options)
            .map(res => <Requester> res)
            .catch(this.handleError)
    }

    updateRequester (requester: Requester): Observable<Requester> {
        // pull out the ID
        const id = requester.id;
        delete requester['id'];

        const body = JSON.stringify(requester);
        const options = { headers: APP_SETTINGS.AUTH_JSON_HEADERS };


        return this.http.put(APP_SETTINGS.REQUESTERS_URL + id + '/', body, options)
            .map(res => <Requester> res)
            .catch(this.handleError)
    }

    private handleError (error: Response) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return observableThrowError(error.json() || 'Server error');
    }
}
