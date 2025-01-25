import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersignupComponent } from './customersignup/customersignup.component';
import { CustomersigninComponent } from './customersignin/customersignin.component';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { authGuard } from './guards/auth.guard';
import { TestComponent } from './test/test.component';
import { AdminsignupComponent } from './adminsignup/adminsignup.component';
import { AdminsigninComponent } from './adminsignin/adminsignin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminuploadComponent } from './adminupload/adminupload.component';
import { CartcomponentComponent } from './cartcomponent/cartcomponent.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpmodalcomponentComponent } from './otpmodalcomponent/otpmodalcomponent.component';
import { PaymentComponent } from './payment/payment.component';
import { CartnavComponent } from './cartnav/cartnav.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: CustomersignupComponent },
  { path: 'signin', component: CustomersigninComponent },
  { path: 'adminsignup', component: AdminsignupComponent},  
  { path: 'adminsignin', component: AdminsigninComponent},  
  { path: 'admindashboard', component: AdmindashboardComponent},  
  { path: 'adminupload', component: AdminuploadComponent},  
  { path: 'cart/:id', component: CartcomponentComponent},
  { path: 'cart-summary', component: CartSummaryComponent},  
  { path: 'forgot-password', component: ForgotPasswordComponent},  
  { path: 'reset-password/:otp', component: ResetPasswordComponent},  
  { path: 'otp', component: OtpmodalcomponentComponent},  
  { path: 'payment', component: PaymentComponent},
  { path: 'cartnav', component: CartnavComponent},

  // { path: 'test', component: TestComponent },
  {
    path: 'dashboard',
    children: [{ path: '', component: CustomerdashboardComponent }],
    canActivate: [authGuard],
  },
];
