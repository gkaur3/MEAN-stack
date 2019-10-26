import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { shallowEqual } from '@angular/router/src/utils/collection';
import {HttpClient} from "@angular/common/http";
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() show: boolean = false;
  @Input() post_id: any;


  comm: any =[];
  _comment: any;
  likedUsers: any =[];
  numberOfLikes: any;

  constructor(private _http: HttpClient, private _postService: PostServiceService) { }

  ngOnInit() {

    this._http.post("http://localhost:3000/getLikeUsers", {headers:{post_id: this.post_id}})
    .subscribe((resp:any)=>{
      console.log(resp);
      this.likedUsers = resp;
      
    })

    this._http.post("http://localhost:3000/numberOfLikes", {headers:{post_id: this.post_id}})
          .subscribe((data:any)=>{
            this.numberOfLikes = data[0].likes.length;
         });
  }

  AddComment(){
    var obj = {
      "post_id" : this.post_id,
      "comment" : this._comment
    }
    this._http.post("http://localhost:3000/comment", obj)
    .subscribe((resp)=>{
      this._http.post("http://localhost:3000/getComments", {headers:{post_id: this.post_id}})
      .subscribe((resp)=>{
        this.comm = resp;
        this._comment="";
    })
    });
  }

  comments(){  
   this.show = !this.show;
   this._http.post("http://localhost:3000/getComments", {headers:{post_id: this.post_id}})
    .subscribe((resp)=>{
        this.comm = resp;
    })
 } 

 delete(){
   this._http.post("http://localhost:3000/deletePost", {headers:{post_id: this.post_id}})
   .subscribe((resp)=>{
      this._postService.updatePostsPage();
   })
 }

 likePost(){
    this._http.post("http://localhost:3000/likePost", {headers:{post_id: this.post_id}})
    .subscribe((resp)=>{
      this._http.post("http://localhost:3000/numberOfLikes", {headers:{post_id: this.post_id}})
          .subscribe((data:any)=>{
            console.log(data[0].likes.length);
            this.numberOfLikes = data[0].likes.length;
         });
    })
 }
}
