




import { Component, OnInit } from '@angular/core';
import { Issues } from '../model/issue.model';
import { IssueService } from '../service/issue.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-issue',
  //standalone: true,
  //imports: [],
  templateUrl: './update-issue.component.html',
  styleUrl: './update-issue.component.css'
})
export class UpdateIssueComponent implements OnInit {
  id:number=0;
  issue:Issues=new Issues();

  constructor(private issueService:IssueService,private route:ActivatedRoute,private router:Router){}
  ngOnInit():void{ 
    this.id=this.route.snapshot.params['id'];
    this.issue=new Issues();
    this.issueService.getIssuesById(this.id).subscribe(searchedIssues=>{this.issue=searchedIssues;},
      error=>console.log(error)
    );
  }

  updateIssues():void{
  this.issueService.updateIssues(this.id,this.issue).subscribe(updatedIssues=>{console.log("updatedIssues"),error=>console.log(error)});
  this.router.navigate(['/issue-list'])
  
 }
  onSubmit(){
    Swal.fire({
      title: " Successfully Updated!!",
      showConfirmButton:false,
      timer:2000,
      icon: "success"
    });
  }
  
}
