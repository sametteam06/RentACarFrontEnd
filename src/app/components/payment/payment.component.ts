import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  message:string;
  response:boolean;
  paymentForm:FormGroup;
  creditCard:CreditCard;
  userId:number;
  currentCreditCard:CreditCard;
  showCard:boolean;

  constructor(private rentalService:RentalService, private toastrService:ToastrService, private formBuilder:FormBuilder, private creditCardService:CreditCardService, private userService:UserService) { }

  async ngOnInit() {
    this.setCreditCard();
    this.createPaymentForm();
    this.setShowCard();
  }
  setShowCard(){
    this.showCard = false;
  }
  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      cardNumber:["", Validators.required],
      cVV:["",Validators.required],
      valid:["",Validators.required],
      name:["",Validators.required],
      rememberMe:[false]
    })
  }
  updatePaymentForm(){
    this.paymentForm = this.formBuilder.group({
      cardNumber:[this.currentCreditCard.cardNumber, Validators.required],
      cVV:[this.currentCreditCard.cVV,Validators.required],
      valid:[this.currentCreditCard.valid,Validators.required],
      name:[this.currentCreditCard.name,Validators.required],
      rememberMe:[false]
    })
  }
  setCreditCard(){
    let mail = localStorage.getItem("mail");
    if(mail){
      this.userService.getUserByMail(mail).subscribe(response=>{
        this.userId = response.data.id;
        this.creditCardService.getByUserId(this.userId).subscribe(async response=>{
          if (response.data){
            this.showCard = true;
          }
          this.currentCreditCard = response.data;
        })
      })
    }
  }
  
  payment(){
   this.rentalService.payment().subscribe(response=>{
    if(this.paymentForm.valid){
      let paymentModel = Object.assign({}, this.paymentForm.value);
      if (paymentModel.rememberMe){
        this.creditCard = {userId:this.userId, cardNumber:paymentModel.cardNumber.toString(), cVV:paymentModel.cVV.toString(),valid:paymentModel.valid,name:paymentModel.name};
        this.creditCardService.add(this.creditCard).subscribe(response=>{
        })
      }
    this.rentalService.addRental().subscribe(response=>{
      this.toastrService.success(response.message, " Kiralama Başarılı")
     });
    }
   })
  }
  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
