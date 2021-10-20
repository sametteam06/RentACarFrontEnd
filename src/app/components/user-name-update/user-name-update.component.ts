import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdateNameModel } from 'src/app/models/updateNameModel';
import { UserDetail } from 'src/app/models/userDetail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-name-update',
  templateUrl: './user-name-update.component.html',
  styleUrls: ['./user-name-update.component.css']
})
export class UserNameUpdateComponent implements OnInit {

  nameUpdateForm:FormGroup;
  currentUser:UserDetail;
  dataLoaded:boolean = false;
  updateModel:UpdateNameModel;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private userService:UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.createNameUpdateForm();
  }
  createNameUpdateForm(){
    this.nameUpdateForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }
  getUser(){
    let mail = localStorage.getItem("mail")
    this.userService.getUserByMail(mail).subscribe(async response=>{
      this.dataLoaded = response.success;
      this.currentUser = response.data;
    })
  }
  updateName(){
    if(this.nameUpdateForm.valid){
      this.updateModel = Object.assign({}, this.nameUpdateForm.value);
      this.updateModel.userId = this.currentUser.id;
      this.userService.updateName(this.updateModel).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı");
      }, responseError=> {
        this.toastrService.error("Formunuz Eksik", "Dikkat");
      })
    }else{
      this.toastrService.error("Formunuz Eksik", "Dikkat")
    }
  }
  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
