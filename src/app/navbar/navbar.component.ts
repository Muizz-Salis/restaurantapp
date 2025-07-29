import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartnavComponent } from '../cartnav/cartnav.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  // styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  


  constructor(public http: HttpClient){}
  public cartItems: any[] = []
  public  totalAmount: number = 0

  ngOnInit(){
    this.http.get('http://localhost/restaurantapp/cartsummary.php', {withCredentials: true}).subscribe((response: any) => {
      this.cartItems = response;
      // console.log(this.cartItems);

      console.log(response);

      this.totalAmount = this.cartItems.reduce((sum, item) => sum + Number(item.quantity), 0);;
      // console.log(this.totalAmount);
      
      
    });
    // this.calculateTotal()
    


  }

  
  calculateTotal() {
    
    // this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.quantity), 0);
  }

}
