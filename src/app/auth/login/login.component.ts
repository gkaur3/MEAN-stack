import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: any= {};
  
  constructor(private _router: Router, private _http: HttpClient, private _authSer: AuthService) { }

  ngOnInit() {
  }

 login(){

  this._authSer.login(this.user);

  //console.log(this.user);
  // this._http.post("http://localhost:3000/login", this.user)
  // .subscribe((resp:any)=>{
  //   // if(resp.token.length>0){
  //     console.log("inside function");
  //     window.localStorage.setItem("token", resp.token);
  //     this._authSer.$authCheck.next(this._authSer.checkUserStatus()); // to emit the event for intimating navbar component
  //     this._router.navigate(['/home']);
  //   // }
    // else{
    //   alert("invalid username or password");
    //   return false;
    // }
//})


 }


}
