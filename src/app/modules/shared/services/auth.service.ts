import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})

export abstract class AuthService<TResponse, TRequest> {

    protected abstract url: string;

    constructor(private _base: BaseService){}


    login(body: TRequest){
        return this._base.post<TResponse>(this.url, body)
    }

    register(body: TRequest){
        return this._base.post<TResponse>(this.url, body)
    }
 }