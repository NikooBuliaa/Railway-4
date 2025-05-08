import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-delete-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-ticket.component.html',
  styleUrl: './delete-ticket.component.scss'
})
export class DeleteTicketComponent {
  constructor(private api:ApiService) {}
  ticketId: string = '';
  delete() {
    this.api.deleteTicket(this.ticketId).subscribe(resp => {
      console.log(resp);
      alert(resp);
    }, error => {
      console.error(error);
      alert(error);
    }
    );
    // Logic to delete the ticket using the ticketId
  }
}
