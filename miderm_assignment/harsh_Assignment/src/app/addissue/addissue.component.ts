import{ Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IssueService } from '../service/issue.service';
 
 
@Component({
  selector: 'app-addissue',
  // standalone: true,
  // imports: [],
  templateUrl: './addissue.component.html',
  styleUrl: './addissue.component.css'
})
export class AddissueComponent implements OnInit{
  addIssueForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private issueService: IssueService) { }
  ngOnInit(): void {
     
    this.addIssueForm = this.formBuilder.group({
       issue_id: [''],
      title: [''],
      description: [''],
      priority : [''],
      status : [''],
      assignee : [''],
      date : ['']
 
    });
  }
  onSubmit(){
  this.issueService.createIssues(this.addIssueForm.value).subscribe(
    data=>{
      Swal.fire({
        icon: "success",
        title: "Hurry...",
        text: "Issue Added",
 
      });
      this.router.navigate(['/issue-list']);
    }
  )
  }
}
