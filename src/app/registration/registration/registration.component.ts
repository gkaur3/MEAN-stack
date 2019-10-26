import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user:any={};
  constructor(private _router:Router, private _http: HttpClient) { }

  ngOnInit() {
  }
  submit(){
    console.log("abc");
    console.log(this.user);
    this._http.post("http://localhost:3000/registration", this.user)
    .subscribe((resp:any)=>{
      console.log(resp);
      this._router.navigate(['/login']);
    })
  }

}
