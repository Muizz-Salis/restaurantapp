import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customersignup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './customersignup.component.html',
  styleUrl: './customersignup.component.css'
})
export class CustomersignupComponent {
constructor(public formbuilder: FormBuilder, public routes: Router, public http:HttpClient){}

public formone : any;


// public data: any
// public firstname: any ="";
// public lastname: any ="";
// public email: any ="";
// public password: any ="";
// public phonenumber: any ="";







ngOnInit(){
  this.formone = this.formbuilder.group({
    firstname: ['', [Validators.required, Validators.pattern('^[A-Z].*')]],
    lastname:['', [Validators.required, Validators.pattern('^[A-Z].*')]],
    email:['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password:['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>/?]).{8,}$')]],
    phonenumber:['', Validators.required],

  })
  
}

create(){
  let obj = {
    firstname: this.formone.value.firstname,
    lastname: this.formone.value.lastname,
    email: this.formone.value.email,
    password: this.formone.value.password,
    phonenumber: this.formone.value.phonenumber
  }
   this.http.post('http://localhost/restaurantapp/backend.php',obj).subscribe((data: any) => {
   console.log(data);
   this.routes.navigate(['/signin']);
   })
}

}