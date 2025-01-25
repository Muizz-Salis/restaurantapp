import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EnvironmentService } from '../services/environment.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
  
})
export class CartSummaryComponent {
  public form:any

  constructor(public http:HttpClient, public service:EnvironmentService, public formbuilder:FormBuilder, public paymentService:PaymentService, public route: Router) {
    // this.updateTotal()
    // this.calculateTotal()
    this.form = formbuilder.group({
      address: ['', Validators.required],  // location validation rule
    
    })
   }

  public data:any[] = []
  cartItems: any[] = []
  

  CartTotalSummary =''

  public locations = [
    {place: 'Ogbomoso', price : 500},
    {place: 'Lagos', price : 2000},
    {place: 'Ibadan', price : 1000},
    {place: 'Abuja', price : 3000},
  ]

  public totalAmount: number = 0;
  public selectedLocationPrice: number = 0
  public productWithPrice: number = 0

  selectedLocation(){
    this.selectedLocationPrice = Number(this.form.value.address)
    this.productWithPrice = this.selectedLocationPrice  + this.totalAmount
    // alert(this.productWithPrice)
  }
  

  
  
  ngOnInit() {
    // this.http.get('http://localhost/restaurantapp/cartsummary.php', {withCredentials: true}).subscribe((response: any) => {
    //   this.cartItems = response

      
      
      
    //   this.calculateTotal();
    // });

    this.LoadItems()
    

    this.getUserDetails()

  }

  LoadItems(){
    this.http
    .get('http://localhost/restaurantapp/cartsummary.php', { withCredentials: true })
    .subscribe((response: any) => {
      this.cartItems = response || []; // Fallback to an empty array
    });
  }

  removeItem(foodId:any){
    // console.log(foodId);

    this.http.post('http://localhost/restaurantapp/removeitem.php', {'foodid': foodId}, {withCredentials: true}).subscribe((response: any) => {
      // console.log(response);
      console.log(this.cartItems);
      
      this.cartItems = this.cartItems.filter(item => item.foodid !== foodId);
      this.totalAmount = this.cartItems.reduce((sum, item) => (item.price * item.quantity) - sum, 0);
      
    });
    

  }

  increment(item: any, foodid: any) {
    item.quantity++;
    this.updateCart(item, foodid);
    this.calculateTotal();
  }

  decrement(item: any, foodid: any) {
    if (item.quantity>1) {
      item.quantity--;
      this.updateCart(item, foodid);
      this.calculateTotal();
      
    }
  }

  updateCart(item: any, foodid: any) {
    let obj = {
      'quantity': item.quantity,
      'foodid': foodid
    };

    this.http.post('http://localhost/restaurantapp/updatecart.php', obj).subscribe((response: any) => {
      alert(response);
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  public userEmail: string = ''
  getUserDetails(){
    this.http.get('http://localhost/restaurantapp/userdetails.php', {withCredentials: true}).subscribe((data: any) => {
      // console.log(data);
      // this.CartTotalSummary = data;
      this.userEmail = data
    })
  }

  // constructor(private paymentService: PaymentService) {}

  payWithPaystack() {
    const paymentDetails = {
      email: this.userEmail, // Customer's email
      amount: this.productWithPrice // Payment amount in NGN (e.g., 5000 Naira)
    };

    console.log(paymentDetails);
    
    // Step 1: Call backend to initialize the payment
    this.paymentService.initializePayment(paymentDetails).subscribe(
      (response) => {     
        // console.log(response);
           
        if (response && response.status) {
          const publicKey = 'pk_test_71c23e56349895029fed608879674f7f80b29573'; // Replace with your Paystack public key          



          // Step 2: Open Paystack payment modal
          const paymentHandler = (window as any).PaystackPop.setup({
            key: publicKey,
            email: paymentDetails.email,
            amount: paymentDetails.amount * 100, // Convert amount to kobo
            ref: response.data.reference, // Reference from backend
            callback: (paymentResponse: any) => {
        // console.log(paymentResponse);
              console.log('Payment successful. Reference:', paymentResponse.reference);

              // Step 3: Call backend to verify the payment
              this.paymentService.verifyPayment(paymentResponse.reference).subscribe(
                (verifyResponse) => {
                  if (verifyResponse.status) {
                    alert('Payment verified successfully!');
                    this.clearCart()
                    this.route.navigate(['/dashboard'])
                  } else {
                    alert('Payment verification failed!');
                  }
                },
                (error) => console.error('Verification error:', error)
              );
            },
            onClose: () => {
              console.log('Payment window closed.');
            }
          });

          paymentHandler.openIframe();
        }
      },
      (error) => console.error('Payment initialization error:', error)
    );
  }

  public cart:any=''

 clearCart(){
  
  this.http.get('http://localhost/restaurantapp/clearcart.php', {withCredentials:true}).subscribe((data:any) => {
    this.cart = data
    // console.log(data);
    
  })
 }


  
}




