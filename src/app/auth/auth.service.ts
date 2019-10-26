import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Subject, BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $authCheck = new BehaviorSubject(this.checkUserStatus());
  constructor(private _router:Router, private _http:HttpClient) { }
  
   login(credentials: any){

    console.log(credentials);
    
    this._http.post("http://localhost:3000/authenticate", credentials)
    .subscribe((resp:any)=>{
      console.log("inside function");
      if(resp.token.length>0){
        window.localStorage.setItem("token", resp.token);
        this.$authCheck.next(this.checkUserStatus());
        this._router.navigate(['/home']);
      }
      else{
        alert("invalid username or password");
        return false;
      }
    });
} 

  checkUserStatus(){
    return window.localStorage.getItem("token") || "";
  }

  logout(){
    window.localStorage.clear();
    this.$authCheck.next(this.checkUserStatus());
    this._router.navigate(['/login']);
  }
}
