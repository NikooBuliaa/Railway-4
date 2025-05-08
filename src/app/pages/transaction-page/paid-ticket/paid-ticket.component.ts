import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paid-ticket',
  standalone: true,
  imports: [], // აქ შეიძლება იყოს სხვა კომპონენტები, რომლებიც საჭიროა, მაგალითად `CommonModule`
  templateUrl: './paid-ticket.component.html',
  styleUrls: ['./paid-ticket.component.scss'] // სწორი ფორმა styleUrls
})

export class PaidTicketComponent {
  // @Input() საშუალებას გვაძლევს მიღებული მონაცემები შევინახოთ
  @Input() paymentDetails: any;
}
