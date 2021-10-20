import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CardetailService } from 'src/app/services/cardetail.service';
import { RentalService } from 'src/app/services/rental.service';
import { CarImageComponent } from '../car-image/car-image.component';
import { CarUpdateComponent } from '../car-update/car-update.component';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  cardetail:CarDetail;
  rent:boolean = false;
  dataLoaded:boolean = false;
  bool:boolean;
  message:string;
  closeResult = "";
  currentCar:Car;
  loginCheck:boolean=false;
  constructor(private carDetailService:CardetailService, private activatedRoute:ActivatedRoute, private rentalService:RentalService, private carService:CarService, private toastrService:ToastrService, private modalService:NgbModal, private authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
        this.getByCarId(params["id"])
    });
    this.isLogin();
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

  isLogin(){
    this.loginCheck = this.authService.isAuthenticated();
  }
  




}
