import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CookiesService } from '../services/cookies.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartnavComponent } from "../cartnav/cartnav.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-customerdashboard',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, CommonModule, RouterModule, CartnavComponent, FooterComponent],
  templateUrl: './customerdashboard.component.html',
  // styleUrl: './customerdashboard.component.css',
})
export class CustomerdashboardComponent {
  constructor(
    public http: HttpClient,
    public routes: Router,
    public cookiesService: CookiesService
  ) {}

  firstname: any = '';
  ngOnInit() {
    this.http
      .get<any>('http://localhost/restaurantapp/customerdashboard.php/', {
        withCredentials: true,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.firstname = data;
      });

    //  this.checkSessionTimeOut()
    this.getUploadedFood();

    // console.log("Uploading");
    
  }

  public mainDishes: any[] = [];
  public Snacks: any[] = [];
  public Swallows: any[] = [];

  public foodUrl = 'http://localhost/restaurantapp/fetchfoods.php';
  getUploadedFood() {
    
    this.http.get(`${this.foodUrl}`).subscribe((data: any) => {

      console.log(data);
      
      // data.map((info: any)=> {
      //   console.log(info);

      //   if (info.category === 'Swallow') {
      //     console.log(info.length);
          
          
      //   }
        
      // })
      
      if (data['Main Dishes'] && Array.isArray(data['Main Dishes'])) {
        this.mainDishes = data['Main Dishes'];
        console.log(data['Main Dishes'][0].image);
      } else {
        this.mainDishes = []; // No data or not an array
        console.warn('No main dishes found or not an array.');
      }

      if (data['Snacks'] && Array.isArray(data['Snacks'])) {
        this.Snacks = data['Snacks'];
      } else {
        this.Snacks = []; // No data or not an array
        console.warn('No snacks found or not an array.');
      }


      if (data['Swallows'] && Array.isArray(data['Swallows'])) {
        this.Swallows = data['Swallows'];
      } else {
        this.Swallows = []; // No data or not an array
        console.warn('No swallow found or not an array.');
      }
    });
  }

  addToCart(foodid:any){
    console.log(foodid);

    
  }

  public token: any = '';
  public sessionExpired = false;
  // checkSessionTimeOut(){

  //   const checkInterval = 10000

  //   this.token = this.cookiesService.getToken()

  //   setInterval(()=>{
  //     const isTokenExpired = this.cookiesService.isTokenExpired(this.token)

  //     if (isTokenExpired && !this.sessionExpired) {
  //       this.sessionExpired = true
  //       this.handleSessionTimeOut()

  //     }
  //   })

  // }

  // handleSessionTimeOut(){
  //   this.routes.navigate(['/signin'])
  // }
}
