// import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OtpmodalcomponentComponent } from "../otpmodalcomponent/otpmodalcomponent.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, OtpmodalcomponentComponent, RouterModule],
  templateUrl: './forgot-password.component.html',
  // styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: any = '';
  message: any = '';

  msg='Alok'

  // test(){
  //   console.log('heyyyyy');
    
  // }

  constructor(public http: HttpClient) {}

  // Initial modal stage
  ModalOpen: boolean = false;
  onSubmit(){
    this.http.post('http://localhost/restaurantapp/customerforgotpassword.php', {email: this.email}).subscribe((data: any) => {
      // console.log(data);
      
      if(data.success){
        this.message = data.message;
        this.ModalOpen=true
      } else {
        this.message = 'Failed to send reset link. Please note that the email entered was not rgistered';
      };
      error: (err: any) => {
        this.message = 'An error occurred. Please try again later.';
        console.error(err); // Log the error for debugging
      }
    });
  }



  submitOtp(){

    this.ModalOpen = false;
  }

}



