import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';
import { CardetailService } from 'src/app/services/cardetail.service';

@Component({
  selector: 'app-image-update',
  templateUrl: './image-update.component.html',
  styleUrls: ['./image-update.component.css']
})
export class ImageUpdateComponent implements OnInit {

  imageAddForm:FormGroup;
  id:number;
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
      this.carImageService.update(this.selectedImage, this.id).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı")
      }, responseError=> {
        this.toastrService.error("Formunuz Eksik", "Dikkat");
      })
    }
  }
  setById(id:number){
    this.id = id;
  }
  setSelectedImage(event: any): void {
    this.selectedImage = event.target.files[0];
  }
  

}
