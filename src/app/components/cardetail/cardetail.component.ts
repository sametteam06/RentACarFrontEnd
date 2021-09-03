import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CardetailService } from 'src/app/services/cardetail.service';
import { CarImageComponent } from '../car-image/car-image.component';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  cardetail:CarDetail;
  
  dataLoaded = false;
  
  constructor(private carDetailService:CardetailService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
        this.getByCarId(params["id"])
    })
  }
  getByCarId(id:number){
    
    this.carDetailService.getByCarId(id).subscribe(result=>{
      this.cardetail = result.data;
      this.dataLoaded = true;
    })
  }
  
  
  
}
