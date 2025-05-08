import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Station } from '../../models/station.model';
import { Departure } from '../../models/departure.model';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.scss']
})


export class TicketBookingComponent implements OnInit {
  stations: Station[] = [];
  departures: Departure[] = [];

  fromStation = '';
  toStation = '';
  selectedDate = '';
  selectedDeparture: Departure | null = null;

  passengerName = '';
  message = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getStations().subscribe(data => this.stations = data);
  }

  searchDepartures(): void {
    if (this.fromStation && this.toStation && this.selectedDate) {
      this.apiService.getDepartures(this.fromStation, this.toStation, this.selectedDate)
        .subscribe(data => this.departures = data);
    }
  }

  bookTicket(departure: Departure): void {
    if (!this.passengerName) {
      this.message = 'გთხოვთ შეიყვანოთ მგზავრის სახელი.';
      return;
    }

    const ticketData = {
      trainId: departure.trainId,
      vagonId: 1, // ან რეალურად აირჩიე ვაგონი
      seatNumber: 1, // ან აირჩიე ცალკე
      passengerName: this.passengerName
    };

    this.apiService.registerTicket(ticketData).subscribe({
      next: () => this.message = 'ბილეთი წარმატებით დაიჯავშნა!',
      error: () => this.message = 'შეცდომა დაჯავშნისას.'
    });
  }
}
