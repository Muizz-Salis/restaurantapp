import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-adminsignin',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './adminsignin.component.html',
  // styleUrl: './adminsignin.component.css'
})
export class AdminsigninComponent {
  constructor(public formbuilder: FormBuilder, public routes:Router, public http:HttpClient){}

  public adminlog: any;
  public data: any;

  ngOnInit(){
    this.adminlog = this.formbuilder.group({
      email: '',
      password:'',  // password validation rule
    })
  }

  login(){
    let obj = {
      email: this.adminlog.value.email,
      password: this.adminlog.value.password
    }
    console.log(obj);
     
     this.http.post<any>('http://localhost/restaurantapp/adminsignin.php/', obj, {withCredentials:true}).subscribe((data:any)=>{
       
       if (data.status=== true) {
        console.log(data);
        document.cookie = `jwt_token=${data.token}; path=/;`; 
        this.routes.navigate(['/adminupload']);
        
      }else{
        console.log('Login failed');
        
      }
     })
  }
  }


