import { Injectable } from '@angular/core';
import { LoginUser, RegisterUser } from '../core/interface';
import { ApiService } from '../core/services/api.service';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable(
    {providedIn: 'root'}
)
export class AuthService{
    constructor(private apiService: ApiService) {

    }
    login(credentials: LoginUser) {
        return this.apiService.login(credentials).pipe(
            shareReplay(), 
            tap((res: HttpResponse<any>) => {
                console.log(res);
                this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
            })
        );
    }

    signUp(credentials: RegisterUser) {
        return this.apiService.signUp(credentials).pipe(
            shareReplay(),
            tap((res) => {
                console.log(res);
                
            })
        );
    }

    private setSession( userId: string, accessToken: string, refreshToken: string) {
        localStorage.setItem('user-id', userId);
        localStorage.setItem('x-access-token', accessToken);
        localStorage.setItem('x-refresh-token', refreshToken);
      }
}