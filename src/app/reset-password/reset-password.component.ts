
import { ActivatedRoute, Router, } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  // styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  newpassword: string = '';
  confirmpassword: string = ''; 
  message: any = '';
  // token: string | null = '';
  toks: string | null = '';  // Token received from URL

  formpass:any=''

  
  // submit(){

  // }

  constructor(public http: HttpClient, public route: ActivatedRoute, public formbuilder:FormBuilder) {} // Inject ActivatedRoute
  ngOnInit() {
    // this.token = this.route.snapshot.queryParamMap.get('token'); // Get token from URL
    this.route.paramMap.subscribe((params) => {
      this.toks = params.get('otp');
    });
    console.log(this.toks);
    
    this.formpass = this.formbuilder.group({
      'newpassword': ['', Validators.required],
      'confirmpassword': ['', Validators.required]
    })
  }
  submit() {
    this.newpassword = this.formpass.value.newpassword
    this.confirmpassword = this.formpass.value.confirmpassword
    
    if (this.newpassword !== this.confirmpassword) {
      this.message = "Passwords do not match.";
      // return;
      console.log(this.message);
      // console.log(new);
      
      
    }
    else{

      const obj = {
        newpassword: this.newpassword,
        toks: this.toks,
      };
      console.log(obj);

      this.http.post('http://localhost/restaurantapp/customerresetpassword.php', obj)
      .subscribe({
        next: (response) => {
          this.message = response;
          console.log(response);
          
          // Optionally redirect or clear the form
          // For example: this.router.navigate(['/login']);
        }
      });

    }
}



// Make an HTTP POST request to reset the password

}


