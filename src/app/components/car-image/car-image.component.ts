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
  carId:number;
  defaultPath = "https://localhost:44358";
  closeResult: string = '';
  deletedImage:CarImage;
  id:number

  constructor(private carImageService:CarImageService, private activatedRoute:ActivatedRoute, private modalService: NgbModal, private toastrService:ToastrService ) { }

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
  open(content:any, id:number) {
    this.setImageId(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deleteImage();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  deleteImage(){
    this.carImageService.getById(this.id).subscribe(response=>{
      this.deletedImage = response.data;
      this.carImageService.delete(this.deletedImage).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı")
        }, responseError=> {
          this.toastrService.error(responseError.message, "Dikkat");
      })
    })
   
    }
   
  
  setImageId(id:number){
    this.id=id;
    console.log(this.id); 
  }
}
