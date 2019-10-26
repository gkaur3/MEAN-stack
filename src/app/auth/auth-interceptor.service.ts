import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHeaders} from "@angular/common/http";
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authSer: AuthService) { }
  intercept(req, next){
    const reqClone = req.clone({
      headers: new HttpHeaders().set("token", this._authSer.checkUserStatus())
    });
    return next.handle(reqClone);
  }
}
