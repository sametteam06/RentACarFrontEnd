import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdatePwModel } from 'src/app/models/updatePwModel';
import { UserDetail } from 'src/app/models/userDetail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-pw-update',
  templateUrl: './user-pw-update.component.html',
  styleUrls: ['./user-pw-update.component.css']
})
export class UserPwUpdateComponent implements OnInit {

  pwUpdateForm:FormGroup;
  currentUser:UserDetail;
  dataLoaded:boolean = false;
  updateModel:UpdatePwModel;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getUser();
    this.createPwUpdateForm();
  }
  createPwUpdateForm(){
    this.pwUpdateForm = this.formBuilder.group({
      password:["",Validators.required],
      passwordCheck:["",Validators.required]
    })
  }
  getUser(){
    let mail = localStorage.getItem("mail")
    this.userService.getUserByMail(mail).subscribe(response=>{
      this.dataLoaded = response.success;
      this.currentUser = response.data;
    })
  }
  updatePw(){
    if(this.pwUpdateForm.valid){
      this.updateModel = Object.assign({}, this.pwUpdateForm.value);
      if(this.updateModel.password != this.updateModel.passwordCheck){
        this.toastrService.error("Girilen Şifreler Aynı Olmalıdır", "Dikkat")
      }else {
        this.updateModel.userId = this.currentUser.id;
        this.userService.updatePw(this.updateModel).subscribe(response=>{
          this.toastrService.success(response.message, " Başarılı");
        }, responseError=> {
        this.toastrService.error("Formunuz Eksik", "Dikkat");
      })
      }
      
    }
  }

}
