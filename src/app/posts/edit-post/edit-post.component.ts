import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {PostServiceService} from "../post-service.service";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  @Input() editPostShow: boolean = false;
  @Input() post_id: any;
  _editPost:any;
  
  @Input() id: any;
  constructor(private _http: HttpClient, private _postService: PostServiceService) { }

  ngOnInit() {
  }

  edit(){
    console.log(this.editPostShow);
    this.editPostShow = !this.editPostShow;
  }
  
 editPost(){
  var obj1 = {
    "post_id" : this.post_id,
    "newPost" : this._editPost
  }
   this._http.post("http://localhost:3000/edit", obj1)
   .subscribe((resp)=>{
      this._postService.updatePostsPage();
   })
 }

 
}
  
