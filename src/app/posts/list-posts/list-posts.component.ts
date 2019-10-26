import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import{Router} from '@angular/router';
import {PostServiceService} from "../post-service.service";

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  posts: any=[];
  constructor(private _http:HttpClient, private _router: Router, private _postService: PostServiceService) { }
  ngOnInit() {
    this._postService.getPosts()
    .subscribe((data:any)=>{
      console.log(data);
      this.posts = data;
    });

    this._postService.$obsInstance.subscribe((resp:any)=>{
      this._postService.getPosts()
      .subscribe((data:any)=>{
        console.log(data);
        this.posts = data;
    })
  })

  }
}
