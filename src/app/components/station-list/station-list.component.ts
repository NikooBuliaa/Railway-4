import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Station } from '../../models/station.model';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {
  stations: Station[] = [];
  loading = false;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getStations().subscribe({
      next: (data) => {
        this.stations = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'შეცდომა სადგურების მიღებისას';
        this.loading = false;
      }
    });
  }
}
