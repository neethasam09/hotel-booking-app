import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private reservationService: ReservationService) {}
  reservations: Reservation[] = [];

  ngOnInit(): void {
    const storedReservations = localStorage.getItem('reservations');
    this.reservations = storedReservations ? JSON.parse(storedReservations) : [];
  }
  editReservation(r:Reservation){
    this.reservationService.updateReservation(r);
  }
  deleteReservation(id:string){
    this.reservationService.deleteReservation(id);
    this.ngOnInit()
  }
}
