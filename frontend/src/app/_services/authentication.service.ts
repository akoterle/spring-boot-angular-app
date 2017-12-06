import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('/auth/session', JSON.stringify({ username: username, password: password }), { headers: headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user /*&& user.token*/) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}