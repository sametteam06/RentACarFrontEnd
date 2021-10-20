import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Displacement } from 'src/app/models/displacement';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { DisplacementService } from 'src/app/services/displacement.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  brands:Brand[];
  displacements:Displacement[];
  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private carService:CarService, private brandService:BrandService, private displacementService:DisplacementService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrandName();
    this.getDisplacement();

  }
  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      displacementId:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      modelYear:["",Validators.required],
      minFindexPoint:["",Validators.min(0),Validators.max(1900)]

    })
  }
  addCar(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı")
      }, responseError=> {
        this.toastrService.error(responseError.error.message, "Dikkat");
      })
    }
  }
  getDisplacement(){
    this.displacementService.getAll().subscribe(result=>{
      this.displacements = result.data;
    })
  }
  getBrandName(){
    this.brandService.brandGetAll().subscribe(result=>{
      this.brands = result.data;
    })
  }
}
