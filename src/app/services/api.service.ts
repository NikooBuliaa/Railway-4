import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Station } from '../models/station.model';
// import { Departure } from '../models/departure.model';
// import { Train } from '../models/train.model';
// import { Vagon } from '../models/vagon.model';
// import { Ticket } from '../models/ticket.model';


@Injectable({ providedIn: 'root' })
export class ApiService {
  bookTicket(bookingData: { vagonId: any; seats: any[]; passenger: { seatId: string; name: string; surname: string; idNumber: string; status: string; payoutCompleted: boolean; }; contact: { trainId: number; date: string; email: string; phoneNumber: string; }; }) {
    throw new Error('Method not implemented.');
  }
  private readonly API_URL = 'https://railway.stepprojects.ge/api/';

  constructor(private http: HttpClient) {}

  getStations(): Observable<any> {
    return this.http.get(this.API_URL + 'stations');
  }

  getDepartures(from: string, to: string, date: string): Observable<any> {
    return this.http.get(`${this.API_URL}getdeparture?from=${from}&to=${to}&date=${date}`);
  }

  getTrain(trainId: number): Observable<any> {
    return this.http.get(`${this.API_URL}trains/${trainId}`);
  }

  getVagon(vagonId: number): Observable<any> {
    return this.http.get(`${this.API_URL}getvagon/${vagonId}`);
  }

  registerTicket(ticketData: any): Observable<any> {
    return this.http.post(`${this.API_URL}tickets/register`, ticketData,{responseType: 'text'});
  }

  checkTicketStatus(ticketId: number): Observable<any> {
    return this.http.post(`${this.API_URL}tickets/checkstatus`, { ticketId });
  }

  fetchTickets(): Observable<any> {
    return this.http.get(`${this.API_URL}tickets`);
  }

  deleteTicket(ticketId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}tickets/cancel/${ticketId}`,{responseType: 'text'});
  }
}
