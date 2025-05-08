import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- დაამატე ეს

@Component({
  selector: 'app-vagons',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- დაამატე აქ
  templateUrl: './vagons.component.html',
  styleUrls: ['./vagons.component.scss']
})
export class VagonsComponent {
  vagons: any[] = [];
  selectedSeats: any[] = [];
  selectedVagon: any = null;
  showPassengerForm: boolean = false; // <-- დამატებული

  onSubmit() {
    // თუ passengerForm სწორია
    this.postObject.people = this.selectedSeats,
    this.api.registerTicket(this.postObject).subscribe(
      response => {console.log('Success:', response);
        alert(response); // შეცვალე ეს ტექსტი საჭიროების მიხედვით,
      },
      error => {console.error('Error:', error);
        alert(error); // შეცვალე ეს ტექსტი საჭიროების მიხედვით,
      }
    );
    this.router.navigate(['/transaction']);
  }
  
  selectedSeat = {
    seatId: '',
    name: '',
    surname: '',
    idNumber: '',
    status: '',
    payoutCompleted: true
  };

  postObject: { trainId: number; date: string; email: string; phoneNumber: string; people: any[] } = {
    trainId: 0,
    date: new Date().toISOString(),
    email: 'string',
    phoneNumber: 'string',
    people: []
  };
 
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
    this.route.params.subscribe(params => {
      const trainId = params['id'];
      this.api.getVagon(trainId).subscribe(result => {
        this.vagons = result;
        this.postObject.trainId = +trainId;
      });
    });
  }

  classSelected = "";

  selectSeat(seat: any, trainId: number) {
    const isSelected = this.isSeatSelected(seat.seatId);
    
    if (isSelected) {
      this.selectedSeats = this.selectedSeats.filter(s => s.seatId !== seat.seatId);
    } else {
      this.selectedSeats.push({
        seatId: seat.seatId,
        number: seat.number,
        price: seat.price,
        trainId: trainId
      });
    }

    localStorage.setItem('trainId', JSON.stringify(trainId));
    localStorage.setItem('selectedSeat', JSON.stringify(this.selectedSeats));
  }

  isSeatSelected(seatId: number): boolean {
    return this.selectedSeats.some(s => s.seatId === seatId);
  }

  groupSeatsByRow(seats: any[]): any[][] {
    const grouped: { [key: string]: any[] } = {};

    seats.forEach(seat => {
      const rowNumberMatch = seat.seatId.match(/\d+/);
      const rowNumber = rowNumberMatch ? rowNumberMatch[0] : 'unknown';
      if (!grouped[rowNumber]) grouped[rowNumber] = [];
      grouped[rowNumber].push(seat);
    });

    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => a.seatId.localeCompare(b.seatId));
    });

    return Object.values(grouped);
  }

  selectVagon(vagon: any) {
    this.selectedVagon = this.selectedVagon === vagon ? null : vagon;
  }

  isVagonSelected(vagon: any): boolean {
    return this.selectedVagon === vagon;
  }

  getTotalPrice(): number {
    return this.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }

  // ✅ ახალი მეთოდი ფორმის გაგზავნისთვის
  submitForm() {
    console.log("მგზავრის მონაცემები:", this.selectedSeat);
    // დაამატე api.post თუ გინდა backend გაგზავნა
    alert("მონაცემები მიღებულია!");
  }
}  