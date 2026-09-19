import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

 constructor(private http:HttpClient) { }

  private reservations: Reservation[] =[]
  private url="http://localhost:3000"

  getReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.url +"/reservations");
  }
  getReservation(id:string): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.url +"/reservation/"+id);
  }

  addReservation(reservation:Reservation):Observable<Reservation[]>{
    reservation.id = Date.now().toString();
    return this.http.post<Reservation[]>(this.url +"/reservation",reservation);
  }

  deleteReservation(id:string):Observable<Reservation[]>{
    let index = this.reservations.findIndex(res=>res.id === id);
    this.reservations.splice(index,1);
    return this.http.delete<Reservation[]>(this.url +"/reservation/"+id);


  }

  updateReservation(updatedReservation:Reservation, id:string):Observable<Reservation[]>{
    let index = this.reservations.findIndex(res=>res.id === id);
    this.reservations[index]=updatedReservation;
    return this.http.put<Reservation[]>(this.url +"/reservation/"+id,updatedReservation);


  }
}
