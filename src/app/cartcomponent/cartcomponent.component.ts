import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentService } from '../services/environment.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-cartcomponent',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './cartcomponent.component.html',
  // styleUrl: './cartcomponent.component.css',
})
export class CartcomponentComponent {
  public count: number = 1 ;
  
  constructor(
    public router:Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public service: EnvironmentService
  ) {}

  public foodId: any;
  public foodItem: any;
  public message: any;
  public foodQuantity:number=0


  arithmethic(foodid:any, action: any) {
    // this.count = this.message
    // console.log(this.count);
    let obj = {
      foodid: foodid
    }
    // this.http.post('http://localhost/restaurantapp/foodcart.php', obj).subscribe((data: any) =>{
    //   this.foodQuantity = data.quantity
    //   console.log(this.foodQuantity);
      
    // })
    
    if (action === '+') {
      let q = this.foodItem.quantity
      if (this.count < q-1) {
        this.count++;
        
      } 
      
    } else if (action === '-') {
      if (this.count > 1) {
        this.count--;
      }
    }
  }

  msg:any =''

  check(){
    this.msg = this.message
    console.log(this.msg);
    

  }

  ngOnInit(id: any) {
    this.route.paramMap.subscribe((params) => {
      this.foodId = params.get('id');
    });

    let obj = {
      foodid: this.foodId,
    };

    console.log(obj);

    this.http
      .post('http://localhost/restaurantapp/getcartdetails.php', obj)
      .subscribe((response: any) => {
        this.foodItem = response;
        console.log(this.foodItem);

      });

      // this.getFoodQuantity()
  }


  // getCartuantity(){

  // }
  

  addToCart() {
    let obj2 = {
      quantity: this.count,
      id: this.foodId 
    };
    console.log(obj2);

    this.http
      .post('http://localhost/restaurantapp/addtocart.php', obj2, {withCredentials: true})
      .subscribe((response: any) => {
        
        this.message = response;
        this.msg = response
        // console.log(this.msg);
        
        console.log(this.message);
        alert(this.message)
        this.router.navigate(['/cart-summary'])
      });
  }


  // public foodQuantity:any=''
  // getFoodQuantity(){
  //   this.http.get('http://localhost/restaurantapp/foodcart.php').subscribe((data: any) =>{
  //     this.foodQuantity = data
  //     console.log(this.foodQuantity);
      
  //   })
  // }
}
