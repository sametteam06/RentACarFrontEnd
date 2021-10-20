import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImageAdd } from 'src/app/models/imageAdd';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {

  imageAddForm:FormGroup;
  carId:number;
  formData:FormData;
  selectedImage:File;


  constructor(private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private carImageService:CarImageService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      this.setById(params["id"])
      this.createImageAddForm(params["id"]);

  })
  }
  createImageAddForm(id:number){
    this.imageAddForm = this.formBuilder.group({
      Image:["",Validators.required],
    })

  }
  addImage(){
    if(this.imageAddForm.valid){
      this.carImageService.add(this.selectedImage, this.carId).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı")
      }, responseError=> {
        this.toastrService.error(responseError.error.Message, "Dikkat");
      })
    }
  }
  setById(id:number){
    this.carId = id;
  }
  setSelectedImage(event: any): void {
    this.selectedImage = event.target.files[0];
  }

}
