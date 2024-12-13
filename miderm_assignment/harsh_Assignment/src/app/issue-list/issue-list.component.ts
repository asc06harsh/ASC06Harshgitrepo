


import { Component,OnInit } from '@angular/core';
import {Issues} from '../model/issue.model';
import { IssueService } from '../service/issue.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issue-list',
  
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css'
})


export class IssueListComponent implements OnInit 
{
  buttonStyle = {
    'background-color': '#4CAF50',
    'color': 'white',
    'padding': '10px 20px',
    'border': 'none',
    'border-radius': '5px',
    'font-size': '16px',
    'cursor': 'pointer'
  };

  issues:Issues[]; 
  issueService:IssueService;
  searchInput:any;
  searchIssue:Issues[]; 

  constructor(issueService:IssueService,private router:Router)
  {
    this.issueService=issueService;
  }
  
  ngOnInit():void
  {
    this.issueService.getIssues().subscribe((issueData)=>{this.issues=issueData});
  }

  deleteIssue(toDeleteIssues: Issues): void
  {
    if (toDeleteIssues.id !== undefined)
    {
      this.issueService.deleteIssue(toDeleteIssues.id).subscribe(() =>
      {
      this.issues = this.issues.filter(issue => issue.issue_id!== toDeleteIssues.id);
      });
    }
  }
  addissue()
  { 
    this.router.navigate(['/addissue']);
  }
  
  updateIssues(issueId:number|undefined):void
  { 
    if(issueId!==undefined)
    { 
      this.router.navigate(['update',issueId])
    }
    else
    { 
      console.log("Issue id is undefined")
    }
  }

  searchIssues() {
    this.issueService.getIssues().subscribe((data) => {
      this.searchIssue= data.filter(issue => issue.issue_id == this.searchInput);
  
      if (this.searchIssue.length > 0) 
      {
        
        Swal.fire({
          title: 'Issue Found!',
          text: `Title : ${this.searchIssue[0].title}`,
          icon: 'success'

        });
      } else
      {
        
        Swal.fire({
          title: 'Issue Not Found!',
          text: 'Please check the Issue and try again.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    });
  }

  logout()
  { 
    sessionStorage.getItem('loggedIn')=='no';
    this.router.navigate(["/login"]);
  }
  
}


