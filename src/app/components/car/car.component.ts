import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = []
  currentCar:Car;
  dataLoaded = false;
  carFilterText="";
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["displacementId"]){
        this.getCarsByDisplacement(params["displacementId"])
      }else {
        this.carGetAll()
      }
    })
  }
  carGetAll(){
    this.carService.carGetAll().subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
  getCarsByBrand(id:number){
    this.carService.getCarsByBrand(id).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
  getCarsByDisplacement(id:number){
    this.carService.getCarsByDisplacement(id).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
  setCurrentCar(car:Car){
    this.currentCar = car;
  }
  getCurrentCarClass(car:Car){
    if(car==this.currentCar){
      return "list-group-item active"
    }else {
      return "list-group-item"
    }
  }
  
  

}
