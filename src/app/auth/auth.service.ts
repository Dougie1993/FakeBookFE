import { Injectable } from '@angular/core';
import { LoginUser, RegisterUser } from '../core/interface';
import { ApiService } from '../core/services/api.service';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Globals } from '../core/services/globals.service';
import { Router } from '@angular/router';

@Injectable(
    {providedIn: 'root'}
)
export class AuthService{
    constructor(private apiService: ApiService, private http: HttpClient, private globals: Globals, private router: Router) {

    }
    login(credentials: LoginUser) {
        return this.apiService.login(credentials).pipe(
            shareReplay(), 
            tap((res: HttpResponse<any>) => {
                console.log(res.body);
                this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
                this.router.navigate(['/layout']);
            })
        );
    }

    signUp(credentials: RegisterUser) {
        return this.apiService.signUp(credentials).pipe(
            shareReplay(),
            tap((res: HttpResponse<any>) => {
                console.log(res);
                this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
                this.router.navigate(['/layout']);
            })
        );
    }

    logout() {
        this.removeSession();
        this.router.navigate(['/login']);
    }

    

    private setSession( userId: string, accessToken: string, refreshToken: string) {
        localStorage.setItem('user-id', userId);
        localStorage.setItem('x-access-token', accessToken);
        localStorage.setItem('x-refresh-token', refreshToken);
    }

    private removeSession() {
        localStorage.removeItem('user-id');
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('x-refresh-token');
    }

    getAccessToken() {
        return localStorage.getItem('x-access-token');
    }
    
    getUserId() {
        return localStorage.getItem('user-id');
    }
    
    getRefreshToken() {
        return localStorage.getItem('x-refresh-token');
    }
    
    setAccessToken(accessToken: string) {
        localStorage.setItem('x-access-token', accessToken);
    }
    
    setRefreshToken(refreshToken: string) {
        localStorage.setItem('x-refresh-token', refreshToken);
    }

    getNewAccessToken() {
        return this.http.get(`${this.globals.api}/users/me/access-token`, {
          headers: {
            'x-refresh-token': this.getRefreshToken(),
            '_id': this.getUserId()
          }, observe: 'response'
        }).pipe(
          tap((res: HttpResponse<any>) => {
            this.setAccessToken(res.headers.get('x-access-token'));
          })
        )
    }

    public isAuthenticated(): boolean {   
    
        const token = localStorage.getItem('x-access-token');    // Check whether the token is expired and return
        // true or false
        console.log('check if access token is valid: ' + token )
        if (token) {
            console.log('check access token validity, refresh token if expired');
            return true
        } else {
            return false;
        }
  }
}