import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Interface {
    constructor() {

    }
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser {
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    password: string;
    created?: Date;
}

export interface Profile {
    firstname: string;
    middlename?: string;
    lastname: string;
    _id: string;

}