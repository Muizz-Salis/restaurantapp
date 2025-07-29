import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otpmodalcomponent',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './otpmodalcomponent.component.html',
  // styleUrl: './otpmodalcomponent.component.css'
})
export class OtpmodalcomponentComponent {

  @Output() submitOtp = new EventEmitter();
  constructor(public formbuilder:FormBuilder, public route:Router, public http:HttpClient){}

  form:any
  ngOnInit(){
    this.form = this.formbuilder.group({
      otp: ['', Validators.required]
    })
  }

  public message=''
  public token=''

  submit(){
    // this.submitOtp.emit();
    let obj = {
      Myotp: this.form.value.otp
    }
    this.http.post('http://localhost/restaurantapp/customerverifyotp.php', obj).subscribe((response:any)=>{
      console.log(response);
      if (response.status === true) {
        this.token = response.token;
        this.route.navigate(['/reset-password', this.token]) 
      }else{
        this.message = response.message;
        this.form.reset();
      }
      
    })
    
  }
  back(){
    this.submitOtp.emit();
    
  }

}
