import { Injectable } from '@angular/core';
import {Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  $obsInstance = new Subject();
  constructor(private _http:HttpClient) { }

  getPosts(){
    return this._http.get("http://localhost:3000/listPosts")
  }

  updatePostsPage(){
    this.$obsInstance.next();
  }
}
