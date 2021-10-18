import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Displacement } from 'src/app/models/displacement';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { DisplacementService } from 'src/app/services/displacement.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  brands:Brand[];
  currentCar:Car;
  displacements:Displacement[];
  carId:number;
  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private carService:CarService, private brandService:BrandService, private displacementService:DisplacementService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      this.getById(params["id"]);
      this.getBrandName();
    this.getDisplacement();
   
  })
  }
  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId:["",Validators.required],
      displacementId:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      modelYear:["",Validators.required],
      minFindexPoint:["",Validators.compose([Validators.min(0),Validators.max(1900), Validators.required])]
    })
  }
  updateCar(){
    console.log("deneme1")
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.id = this.currentCar.id;
      console.log(carModel);
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı")
      }, responseError=> {
        this.toastrService.error(responseError.error.message, "Dikkat");
      })
    }else{
      console.log("deneme")
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
  getById(id:number){
    this.carService.getById(id).subscribe(result=>{
      this.currentCar = result.data;
    })
  }
}
