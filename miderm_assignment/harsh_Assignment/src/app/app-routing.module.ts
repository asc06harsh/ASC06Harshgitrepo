import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { AuthGuardService } from './service/auth-guard.service';
import { UpdateIssueComponent } from './update-issue/update-issue.component';
import { AddissueComponent } from './addissue/addissue.component';




const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'issue-list',component:IssueListComponent,canActivate:[AuthGuardService]},
  { path: 'update/:id', component: UpdateIssueComponent },
  { path: 'addissue', component: AddissueComponent }
  
]

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap:[AppComponent]
 
})

export class AppRoutingModule { }
