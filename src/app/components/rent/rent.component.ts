import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  responseSuccess:boolean;
  responseMessage:string = "";
  rentDate:Date;
  returnDate:Date;
  checkSuccess:boolean = false;
  checkMessage:string = "Lütfen Tarih Seçiniz!";

  constructor(private rentalService:RentalService, private toastrService:ToastrService, private userService:UserService) { }

  ngOnInit(): void {
    
    }
    setDates(rentDate:Date, returnDate:Date){
      if(rentDate == null || returnDate == null || rentDate >= returnDate){
        this.toastrService.error("Lütfen Geçerli Bir Tarih Giriniz!", "Tarihler Geçersiz")
      }else{
        this.userService.getUserByMail(localStorage.getItem("mail")).subscribe(response=>{
          let id = response.data.id;
          this.rentalService.setDates(rentDate, returnDate, id);
          this.checkRental();
        })
      }
    }
    addRental(){
      this.rentalService.addRental().subscribe(response=>{
       this.responseMessage = response.message;
       this.responseSuccess = response.success;
       this.toastrService.success(response.message, " Başarılı")   
      })
    }
    checkRental(){
      this.rentalService.checkRental().subscribe(response=>{
        this.checkSuccess = response.success;   
      }, responseError =>{
          this.toastrService.error(responseError.error.message,"Kiralama Yapılamadı")
      })
    }
}


