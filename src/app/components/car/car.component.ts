import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarImageComponent } from '../car-image/car-image.component';
import { CardetailComponent } from '../cardetail/cardetail.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = []
  currentCar:Car;
  dataLoaded = false;
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      } {
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
  getCarsByColor(id:number){
    this.carService.getCarsBycolor(id).subscribe(response=>{
      this.cars = response.data;
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
