import { Component, OnInit } from '@angular/core';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
import { ActivatedRoute } from '@angular/router';
import { CardetailService } from 'src/app/services/cardetail.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {
  carImages:CarImage[] = [];
  dataLoaded = false;
  defaultPath = "http://rentacarproject.abdulsametozdemir.com/";
  defaultImage:string;

  constructor(private carImageService:CarImageService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getImages(params["id"])
    })
  }
  
  getImages(carId:number){
    this.carImageService.getImages(carId).subscribe(response=>{
      this.carImages = response.data
      this.defaultImage = this.defaultPath+response.data[0].imagePath;
      this.dataLoaded = true;
    })
  }
  getPath(){
    return this.defaultPath;
  }
  setDefaultImage(imageId:number){
    this.defaultImage = this.defaultPath + this.carImages[imageId].imagePath;
  }
}
