import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  // styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private paymentService: PaymentService, public route:Router) {}

  payWithPaystack() {
    const paymentDetails = {
      email: 'muizzadeyanju@gmail.com', // Customer's email
      amount: 5000 // Payment amount in NGN (e.g., 5000 Naira)
    };

    // Step 1: Call backend to initialize the payment
    this.paymentService.initializePayment(paymentDetails).subscribe(
      (response) => {     
        console.log(response);
           
        if (response && response.status) {
          const publicKey = 'pk_test_71c23e56349895029fed608879674f7f80b29573'; // Replace with your Paystack public key          



          // Step 2: Open Paystack payment modal
          const paymentHandler = (window as any).PaystackPop.setup({
            key: publicKey,
            email: paymentDetails.email,
            amount: paymentDetails.amount * 100, // Convert amount to kobo
            ref: response.data.reference, // Reference from backend
            callback: (paymentResponse: any) => {
        console.log(paymentResponse);
              console.log('Payment successful. Reference:', paymentResponse.reference);

              // Step 3: Call backend to verify the payment
              this.paymentService.verifyPayment(paymentResponse.reference).subscribe(
                (verifyResponse) => {
                  if (verifyResponse.status) {
                    alert('Payment verified successfully!');
                    
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
 
}
