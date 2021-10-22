import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarMainPageDto } from 'src/app/models/carMainPageDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  carMainPageDtos:CarMainPageDto[] = [];
  dataLoaded:boolean=false;
  cars:Car[]

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["displacementId"]){
        this.getCarsByDisplacement(params["displacementId"])
      }else {
    this.getCars();
      }})
  }

  getCars(){
    this.carService.getCarsForMainPage().subscribe(response=>{
      this.carMainPageDtos = response.data;
      this.dataLoaded=response.success;
    })
  }
  setImagePath(carId:number){
    for (let i = 0; i < this.carMainPageDtos.length; i++){
      if(this.carMainPageDtos[i].carId == carId){
        return "http://rentacarproject.abdulsametozdemir.com/"+this.carMainPageDtos[i].imagePath;
      }
    }
    return "http://rentacarproject.abdulsametozdemir.com/images/default-image.jpg"
  }
  getCarsByBrand(id:number){
    this.carService.getCarsForMainPageByBrandId(id).subscribe(response=>{
      this.carMainPageDtos = response.data
      this.dataLoaded = true;
    })
  }
  getCarsByDisplacement(id:number){
    this.carService.getCarsForMainPageByDisplacementId(id).subscribe(response=>{
      this.carMainPageDtos = response.data
      this.dataLoaded = true;
    })
  }

}
