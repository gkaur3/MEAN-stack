import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { PostsComponent } from './posts/posts/posts.component';
import { HomeComponent } from './home/home/home.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import {AuthGuard} from "./auth/auth.guard";
import { EditPostComponent } from './posts/edit-post/edit-post.component';
/*import { homedir } from 'os'; */
const routes: Routes = [
  {path:"registration", component:RegistrationComponent},
  {path:"login", component:LoginComponent},
  {path:"home", component:HomeComponent, canActivate:[AuthGuard]},
  {path:"posts", component:PostsComponent, canActivate:[AuthGuard]},
  {path:"listPosts", component:ListPostsComponent, canActivate:[AuthGuard]},

/*{path:"editPost", component:EditPostComponent, canActivate:[AuthGuard]} */
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
