import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-customersignin',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './customersignin.component.html',
  styleUrl: './customersignin.component.css'
})
export class CustomersigninComponent {
  constructor(public formbuilder: FormBuilder, public routes:Router, public http:HttpClient){}

  public formtwo: any;
  public data: any;
  ngOnInit(){
    this.formtwo = this.formbuilder.group({
      email: '',
      password:'',  // password validation rule
    })
  }

  signin(){
    
    let obj =  {
      email: this.formtwo.value.email,

      password: this.formtwo.value.password
     };

     console.log(obj);
     
     this.http.post<any>('http://localhost/restaurantapp/customersignin.php/', obj, {withCredentials:true}).subscribe((data:any)=>{
       
       if (data.status=== true) {
        console.log(data);
        document.cookie = `jwt_token=${data.token}; path=/;`; 
        this.routes.navigate(['/dashboard']);
        
      }else{
        console.log('Login failed');
        
      }
     })
  }


}
