import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from 'src/app/models/userDetail';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user:UserDetail
  dataLoaded:boolean = false;
  closeResult="";
  imageFormActivator:boolean = false;
  imageAddForm:FormGroup;
  selectedImage:File;
  userImage:string;

  constructor(private userService:UserService, private toastrService:ToastrService,private formBuilder:FormBuilder, private userImageService:UserImageService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(){
    let mail = localStorage.getItem("mail")
    this.userService.getUserByMail(mail).subscribe(response=>{
      this.dataLoaded = response.success;
      this.user = response.data;
      this.userImageService.getByUserId(this.user.id).subscribe(response=>{
        this.userImage = "https://localhost:44358"+response.data.imagePath;
      })
    })
  }
  createImageForm(){
    this.imageFormActivator = true;
    this.imageAddForm = this.formBuilder.group({
      Image:["",Validators.required],
    })
  }
  addImage(){
    if(this.imageAddForm.valid){
      this.userImageService.add(this.selectedImage, this.user.id).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı")
      }, responseError=> {
        this.toastrService.error("Formunuz Eksik", "Dikkat");
      })
    }
  }
  setSelectedImage(event: any): void {
    this.selectedImage = event.target.files[0];
  }

}
