import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable(
    {providedIn: 'root'}
)
export class Globals {
    constructor () {}

    private _api = environment.apiUrl;

    get api(): string {
        return this._api;
    }
}