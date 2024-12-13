import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking-dash.component.html',
  styleUrls: ['./booking-dash.component.css'],
})
export class BookingComponent implements OnInit {
  selectedMenu: string = 'trip';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Default route
    this.navigateTo(this.selectedMenu);
  }

  navigateTo(option: string): void {
    this.selectedMenu = option;
    this.router.navigate([`/dashboard/${option}`]);
  }
}
