import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { FeedbackService } from '../shared/feedback.service';
import { Feedback } from '../model/feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm!: UntypedFormGroup;
  feedbackData: Feedback[] = [];
  feedbackModel: Feedback = new Feedback();
  showAdd!: boolean;
  showEdit!: boolean;

  @ViewChild('closeButton') closeButton!: ElementRef;

  constructor(private formBuilder: UntypedFormBuilder, private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      name: [''],
      email: [''],
      message: ['']
    });
    this.getAllFeedback();
  }

  clickAddFeedback() {
    this.feedbackForm.reset();
    this.showAdd = true;
    this.showEdit = false;
  }

  addFeedback() {
    this.feedbackModel = { ...this.feedbackForm.value };
    this.feedbackService.postFeedback(this.feedbackModel).subscribe(() => {
      alert("Feedback Added Successfully");
      this.closeButton.nativeElement.click();
      this.getAllFeedback();
    });
  }

  getAllFeedback() {
    this.feedbackService.getFeedback().subscribe((res) => {
      this.feedbackData = res;
    });
  }

  onEditFeedback(feedback: Feedback) {
    this.feedbackModel.id = feedback.id;
    this.feedbackForm.patchValue(feedback);
    this.showAdd = false;
    this.showEdit = true;
  }

  updateFeedback() {
    this.feedbackModel = { ...this.feedbackModel, ...this.feedbackForm.value };
    this.feedbackService.updateFeedback(this.feedbackModel.id, this.feedbackModel).subscribe(() => {
      alert("Feedback Updated Successfully");
      this.closeButton.nativeElement.click();
      this.getAllFeedback();
    });
  }

  deleteFeedback(id: number) {
    this.feedbackService.deleteFeedback(id).subscribe(() => {
      
      this.getAllFeedback();
    });
  }
}
