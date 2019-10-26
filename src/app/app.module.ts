import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { HomeComponent } from './home/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { PanelBoxComponent } from './panel/panel-box/panel-box.component';
import { PostsComponent } from './posts/posts/posts.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';

import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { CommentsComponent } from './posts/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    NavbarComponent,
    PanelBoxComponent,
    PostsComponent,
    ListPostsComponent,
    EditPostComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService, 
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
