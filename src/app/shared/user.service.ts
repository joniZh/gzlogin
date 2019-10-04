import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError, BehaviorSubject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {JwResponse} from './jw-response';
import { tap } from 'rxjs/operators';
import { reject } from 'q';
import {auth, storage} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
// import { Http, Response, Headers } from '@angular/http';
import { Http, Headers } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseURL = "http://159.89.50.39:5000/auth";

    authSubject = new BehaviorSubject(false);
    public token: any;
    public Tusername: string;
     public isError = '';

    constructor(
      public http: Http,
      public router: Router,
      private authFire: AngularFireAuth
     ) { }


     registar(user) {
      let headers = new Headers({'Authentication': 'token'});
      let options = { headers: headers };
      let url = this.baseURL + '/register';

      return new Promise((resolve) => {
        this.http.post(url, user)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status == 200) {
            this.gToken(data);
              resolve(data._body);
            } else {
              resolve(false);
            }
            resolve(false);
          });
        });
     }

     login(user) {
      let headers = new Headers({'Authentication': 'token'});
      let options = { headers: headers };
      let url = this.baseURL + '/login';

      return new Promise((resolve) => {
        this.http.post(url, user, options)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status == 200) {
            this.gToken(data);
              resolve(data._body);
            } else if(data.status == 401) {
              // this.isError = data.message;
               resolve(false);
            }
            resolve(false);
          });
        });
    }

    testToken(data) {
      let headers = new Headers({'Authentication': 'token'});
      let options = { headers: headers };
      let url = this.baseURL+ 'users';
      return new Promise((resolve) => {
        this.http.get(url, options)
          .subscribe((data: any) => {
            // console.log(data);
            if (data.status == 200) {              
              resolve(data._body);
            } else {
              resolve(false);
            }
          });
      })
    }
    
    loginGoogle() {
      return this.authFire.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    logout() {
      localStorage.removeItem('token');
    }

    public gToken(token){
    localStorage.setItem('token', token._body);
  }

  public  IniSession(): boolean {
    return (localStorage.getItem('token') !== null);
  }

}