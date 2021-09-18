import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CardetailService } from 'src/app/services/cardetail.service';
import { RentalService } from 'src/app/services/rental.service';
import { CarImageComponent } from '../car-image/car-image.component';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  cardetail:CarDetail;
  rent = false;
  dataLoaded = false;
  bool:boolean;
  message:string;
  
  constructor(private carDetailService:CardetailService, private activatedRoute:ActivatedRoute, private rentalService:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
        this.getByCarId(params["id"])
    })
  }
  getByCarId(id:number){
    
    this.carDetailService.getByCarId(id).subscribe(result=>{
      this.cardetail = result.data;
      this.message = result.message;
      this.bool = result.success;
      this.dataLoaded = true;
    })
  }
  rentPage(carId:number){
    this.rent = true;
    this.rentalService.setCarId(carId);
  }
  
  
  
}
