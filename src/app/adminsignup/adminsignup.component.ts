import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminsignup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './adminsignup.component.html',
  // styleUrl: './adminsignup.component.css'
})
export class AdminsignupComponent {
  constructor(public formbuilder: FormBuilder, public routes: Router, public http:HttpClient){}

  public formadmin : any;

  ngOnInit(){
    this.formadmin = this.formbuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[A-Z].*')]],
      lastname: ['', [Validators.required, Validators.pattern('^[A-Z].*')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>/?]).{8,}$')]],
      phonenumber: ['',Validators.required],
    })

  }



  create(){

    let obj = {
      firstname: this.formadmin.value.firstname,
      lastname: this.formadmin.value.lastname,
      email: this.formadmin.value.email,
      password: this.formadmin.value.password,
      phonenumber: this.formadmin.value.phonenumber
    }
    // console.log(obj);
   this.http.post('http://localhost/restaurantapp/adminsignup.php',obj).subscribe((data: any) => {
   console.log(data);
   this.routes.navigate(['/adminsignin']);
   })
    
  }
}
