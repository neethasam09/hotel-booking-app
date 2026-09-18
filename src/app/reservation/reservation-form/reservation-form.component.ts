import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private reservationService:ReservationService, private router:Router) { }
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required],
      guestName:['',Validators.required],
      guestEmail:['',[Validators.required,Validators.email]],
      roomNumber:['',Validators.required],
    })
  }

  reservationForm:FormGroup = new FormGroup({})

  onSubmit(){
    console.log("submit clicked")
    if(this.reservationForm.valid){
      console.log("valid")
    }
    this.reservationService.addReservation(this.reservationForm.value)
    this.router.navigate(['/list'])
  }
}
