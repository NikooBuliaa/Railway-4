import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaidTicketComponent } from './paid-ticket/paid-ticket.component'; // PaidTicketComponent-ის იმპორტი

@Component({
  selector: 'app-transaction-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PaidTicketComponent], // იმპორტი
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent {
  [x: string]: any;
  payment = {
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardHolder: ''
  };

 
  paymentSuccess = false;
  paymentError = false;
  paid = false; // თუ გადახდა განხორციელდა, ის True გახდება

  // submitPayment ფუნქცია
  submitPayment() {
    if (this.payment.cardNumber && this.payment.expiry && this.payment.cvc && this.payment.cardHolder) {
      this.paymentSuccess = true;
      this.paymentError = false;
      this.paid = true; // გადახდა შესრულდა
    } else {
      this.paymentSuccess = false;
      this.paymentError = true;
    }
  }
}
