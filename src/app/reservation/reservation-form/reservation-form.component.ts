import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  isEditMode=false
  reservationId!: string;

  constructor(private formBuilder: FormBuilder, private reservationService:ReservationService, private router:Router, private route:ActivatedRoute) { }
  ngOnInit() {
   
    this.reservationForm = this.formBuilder.group({
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required],
      guestName:['',Validators.required],
      guestEmail:['',[Validators.required,Validators.email]],
      roomNumber:['',Validators.required],
    })
    
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.isEditMode=true;
      this.reservationId = String(id)?String(id):'';
      const tobeEditedReservation = this.reservationService.getReservation(this.reservationId);
      if(tobeEditedReservation){
        this.reservationForm.patchValue({
          checkInDate: tobeEditedReservation.checkInDate,
          checkOutDate: tobeEditedReservation.checkOutDate,
          guestName: tobeEditedReservation.guestName,
          guestEmail: tobeEditedReservation.guestEmail,
          roomNumber: tobeEditedReservation.roomNumber
        });
      }
    }
  }

  reservationForm:FormGroup = new FormGroup({})

  onSubmit(){
    console.log("submit clicked")
    if(this.reservationForm.valid){
      if(this.isEditMode){
        this.reservationService.updateReservation(this.reservationForm.value,this.reservationId)
        this.router.navigate(['/list'])
      }
      else{
         this.reservationService.addReservation(this.reservationForm.value)
         this.router.navigate(['/list'])
      }
    }
   
  }
}
