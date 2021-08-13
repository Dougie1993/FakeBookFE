import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoginUser, RegisterUser } from '../interface';
import { Globals } from './globals.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor ( private http: HttpClient, private globals: Globals ) {

    }

    login(credentials: LoginUser) {
        // send to backend url
        // console.log('ready to send to backend: ' + credentials.email + ' ' + credentials.password);
        return this.http.post(`${this.globals.api}/user/login`,  credentials , { observe: 'response' });
    }

    signUp(credentials: RegisterUser) {
        // send to backend url
        console.log('ready to send to backend: ' + credentials);
        return this.http.post(`${this.globals.api}/user/register`,  credentials , { observe: 'response' });
    }

    get(url: String) {
        return this.http.get(`${this.globals.api}/${url}`);
    }

}