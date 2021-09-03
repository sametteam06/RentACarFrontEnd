import { Component, OnInit } from '@angular/core';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {
  carImages:CarImage[] = [];
  dataLoaded = false;
  carId:number;
  defaultPath = "https://localhost:44358";

  constructor(private carImageService:CarImageService, private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getImages(params["id"])
  })
  }
  setCarId(id:number){
    this.carId = id;
  }
  getImages(carId:number){
    this.carImageService.getImages(carId).subscribe(response=>{
      this.carImages = response.data
      this.dataLoaded = true;
    })
  }
  getPath(){
    return this.defaultPath;
  }
}
