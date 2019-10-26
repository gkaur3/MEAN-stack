import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  post: any={};
  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit() {
    this._http.get("http://localhost:3000/posts")
    .subscribe((resp: any)=>{
      console.log(resp);
      this.post.post_creator = resp.username;
    })
    
  }
  createPost(){
    this._http.post("http://localhost:3000/posts", this.post)
    .subscribe((data:any)=>{
      this._router.navigate(['/listPosts']);
    })
  }


}
