import { Injectable } from "@angular/core";
// import {  CanActivate } from "@angular/router";

Injectable({
    providedIn: 'root'
})
export class AuthGuardService  {
    constructor(){}

    IsLoggedIn(){
        return 
    }
    canActivate(): boolean {
        return true
    }
}