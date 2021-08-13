import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
  })
export class ProfileService {
    constructor(private api: ApiService){}

    getProfile(_id, token) {
        return this.api.get(`user/profile/${_id}/me/${token}`);
    }
}