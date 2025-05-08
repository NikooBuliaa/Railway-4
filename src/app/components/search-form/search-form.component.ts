import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
    styleUrl: './search-form.component.scss',
    standalone: true,
})
export class SearchFormComponent implements OnInit {
  departure = '';
  destination = '';
  date = new Date().toISOString().split('T')[0];
  stations: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getStations().subscribe(stations => {
      this.stations = stations;
    });

    const params = new URLSearchParams(window.location.search);
    this.departure = params.get('departure') || '';
    this.destination = params.get('destination') || '';
    this.date = params.get('date') || this.date;
  }

  search(): void {
    this.router.navigate(['/trains'], {
      queryParams: {
        departure: this.departure,
        destination: this.destination,
        date: this.date
      }
    });
  }
}
