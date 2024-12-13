import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking-dash/booking-dash.component';
import { TripComponent } from './trip/trip.component';
import { CabComponent } from './cab/cab.component';

import { PaymentsComponent } from './payments/payments.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BookingCombinedComponent } from './bookingcombined/bookingcombined.component';
import { AuthGuardService } from './shared/auth.service';





const routes: Routes = [
  {
    path: '', redirectTo: 'login',pathMatch: 'full'
  },
  {
   path: 'login', component: LoginComponent 
  },
 {
   path: 'signup', component: SignupComponent 
 }, 

 {
  path:'contact' , component: ContactComponent
},
{
  path:'booking' , component: BookingComponent,canActivate:[AuthGuardService]
},
{
  path:'trip' , component: TripComponent,canActivate:[AuthGuardService]
},
{
  path:'cab' , component: CabComponent,canActivate:[AuthGuardService]
},

{
  path:'payments' , component: PaymentsComponent,canActivate:[AuthGuardService]
},
{
  path:'feedback' , component: FeedbackComponent,canActivate:[AuthGuardService]
},
{
  path:'gallery' , component: GalleryComponent
},
{
  path:'bookingcombined' , component: BookingCombinedComponent
},
{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
},
{
  path: 'dashboard',
  component: BookingComponent,canActivate:[AuthGuardService],
  children: [
    { path: 'trip', component: TripComponent,canActivate:[AuthGuardService] },
    { path: 'cab', component: CabComponent,canActivate:[AuthGuardService] },
    { path: 'payments', component: PaymentsComponent,canActivate:[AuthGuardService] },
    { path: 'feedback', component: FeedbackComponent,canActivate:[AuthGuardService] },
    { path: 'bookingcombined',component:BookingCombinedComponent,canActivate:[AuthGuardService]}
  ],
},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
