import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private reservationService: ReservationService, private router: Router) {}
  reservations: Reservation[] = [];

  ngOnInit(): void {
    const storedReservations = localStorage.getItem('reservations');
    this.reservations = storedReservations ? JSON.parse(storedReservations) : [];
  }
  editReservation(r:Reservation){
    console.log("edit clicked")
    console.log(r)
    // navigate expects an array of path segments; do not use bracket indexing
    this.router.navigate(['/edit', r.id]);
    console.log("navigated to edit")
  }
  deleteReservation(id:string){
    this.reservationService.deleteReservation(id);
    this.ngOnInit()
  }
}
