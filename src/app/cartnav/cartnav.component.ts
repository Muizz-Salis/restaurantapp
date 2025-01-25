import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cartnav',
  standalone: true,
  imports: [],
  templateUrl: './cartnav.component.html',
  styleUrl: './cartnav.component.css'
})
export class CartnavComponent {

  constructor(public http: HttpClient){}
  public cartItems: any[] = []

  ngOnInit(){
    this.http.get('http://localhost/restaurantapp/cartsummary.php', {withCredentials: true}).subscribe((response: any) => {
      this.cartItems = response;
      // console.log(this.cartItems);

      console.log(response);
      
      
    });

  }

}
