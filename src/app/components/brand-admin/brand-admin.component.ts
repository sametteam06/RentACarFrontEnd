import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
@Component({
  selector: 'app-brand-admin',
  templateUrl: './brand-admin.component.html',
  styleUrls: ['./brand-admin.component.css']
})
export class BrandAdminComponent implements OnInit {

  brands:Brand[] = [];
  currentBrand : Brand;
  brand : Brand;
  dataLoaded = false;
  brandFilterText = "";
  closeResult="";


  constructor(private brandService:BrandService, private modalService:NgbModal, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.setCurrentBrand(this.brand);
    this.brandGetAll();
  }
  brandGetAll(){
    this.brandService.brandGetAll().subscribe(response=>{
      this.brands = response.data
      this.dataLoaded = true;
    })
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }
  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item active"
    }else {
      return "list-group-item"
    }
  }
  getAllBrandClass(){
      if(this.currentBrand){
        return "list-group-item"
      }else{
        return "list-group-item active"
      }
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deleteBrand();
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
  deleteBrand(){
    this.brandService.delete(this.currentBrand).subscribe(response=>{
      this.toastrService.success(response.message, " Başarılı")
        }, responseError=> {
          this.toastrService.error(responseError.message, "Dikkat");
      })
  }

}
