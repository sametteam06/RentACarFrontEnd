import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdateEmailModel } from 'src/app/models/updateEmailModel';
import { UserDetail } from 'src/app/models/userDetail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-email-update',
  templateUrl: './user-email-update.component.html',
  styleUrls: ['./user-email-update.component.css']
})
export class UserEmailUpdateComponent implements OnInit {

  emailUpdateForm:FormGroup;
  currentUser:UserDetail;
  dataLoaded:boolean = false;
  updateModel:UpdateEmailModel;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private userService:UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.createEmailUpdateForm();
  }
  createEmailUpdateForm(){
    this.emailUpdateForm = this.formBuilder.group({
      email:["",Validators.required]
    })
  }
  getUser(){
    let mail = localStorage.getItem("mail")
    this.userService.getUserByMail(mail).subscribe(response=>{
      this.dataLoaded = response.success;
      this.currentUser = response.data;
    })
  }
  updateEmail(){
    if(this.emailUpdateForm.valid){
      this.updateModel = Object.assign({}, this.emailUpdateForm.value);
      this.updateModel.userId = this.currentUser.id;
      this.userService.updateEmail(this.updateModel).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı");
        localStorage.removeItem("mail");
        localStorage.setItem("mail",response.data.email);
      }, responseError=> {
        this.toastrService.error("Formunuz Eksik", "Dikkat");
      })
    }
  }
}
