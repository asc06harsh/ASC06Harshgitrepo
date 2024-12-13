import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking-dash/booking-dash.component';
import { TripComponent } from './trip/trip.component';
import { CabComponent } from './cab/cab.component';
import { PaymentsComponent } from './payments/payments.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BookingCombinedComponent } from './bookingcombined/bookingcombined.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ContactComponent,
    BookingComponent,
    TripComponent,
    CabComponent,
    PaymentsComponent,
    FeedbackComponent,
    GalleryComponent,
    BookingCombinedComponent,
    
    
    
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
