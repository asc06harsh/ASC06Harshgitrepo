import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { RouterModule, RouterOutlet } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";

import { CommonModule } from "@angular/common";

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from "./login/login.component";
import { IssueListComponent } from "./issue-list/issue-list.component";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { UpdateIssueComponent } from "./update-issue/update-issue.component";
import { AddissueComponent } from "./addissue/addissue.component";



@NgModule({
    declarations :[AppComponent,LoginComponent,IssueListComponent,HomeComponent,NavbarComponent,UpdateIssueComponent,AddissueComponent],
    
    imports:[BrowserModule,AppRoutingModule,RouterOutlet,ReactiveFormsModule,RouterModule,FormsModule,CommonModule,HttpClientModule],
    bootstrap:[AppComponent],
    providers: [
      provideAnimationsAsync()
    ]
})

export class AppModule{}
