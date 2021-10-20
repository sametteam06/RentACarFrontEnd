import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-admin',
  templateUrl: './car-admin.component.html',
  styleUrls: ['./car-admin.component.css']
})
export class CarAdminComponent implements OnInit {
  carDetails:CarDetail[]=[];
  dataLoaded:boolean = false;
  closeResult:string = "";
  currentCar:Car;
  currentCarDetail:CarDetail;


  constructor(private carService:CarService, private modalService:NgbModal, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCars()
  }

  getCars(){
    this.carService.getDetails().subscribe(response=>{
      this.carDetails = response.data;
      this.dataLoaded = response.success;
    })
  }
  open(content:any, id:number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deleteCar(id);
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
  deleteCar(id:number){
    this.carService.getById(id).subscribe(response=>{
      this.currentCar = response.data;
      this.carService.delete(this.currentCar).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı")
          }, responseError=> {
            this.toastrService.error(responseError.message, "Dikkat");
        })
      }) 
  }
  getCurrentCarDetailClass(carDetail:CarDetail){
    if(carDetail == this.currentCarDetail){
      return "list-group-item active"
    }else {
      return "list-group-item"
    }
  }
  setCurrentCarDetail(carDetail:CarDetail){
    this.currentCarDetail = carDetail;
  }

}
