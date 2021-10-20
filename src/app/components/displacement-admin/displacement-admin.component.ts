import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Displacement } from 'src/app/models/displacement';
import { DisplacementService } from 'src/app/services/displacement.service';

@Component({
  selector: 'app-displacement-admin',
  templateUrl: './displacement-admin.component.html',
  styleUrls: ['./displacement-admin.component.css']
})
export class DisplacementAdminComponent implements OnInit {

  displacements:Displacement[] = [];
  currentDisplacement : Displacement;
  displacement : Displacement;
  dataLoaded = false;
  displacementFilterText = "";
  closeResult = "";


  constructor(private displacementService:DisplacementService, private modalService:NgbModal, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.setCurrentDisplacement(this.displacement);
    this.displacementGetAll();
  }
  displacementGetAll(){
    this.displacementService.getAll().subscribe(response=>{
      this.displacements = response.data
      this.dataLoaded = true;
    })
  }
  setCurrentDisplacement(displacement:Displacement){
    this.currentDisplacement = displacement;
  }
  getCurrentDisplacementClass(displacement:Displacement){
    if(displacement == this.currentDisplacement){
      return "list-group-item active"
    }else {
      return "list-group-item"
    }
  }
  getAllDisplacementClass(){
      if(this.currentDisplacement){
        return "list-group-item"
      }else{
        return "list-group-item active"
      }
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deleteDisplacement();
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
  deleteDisplacement(){
    this.displacementService.delete(this.currentDisplacement).subscribe(response=>{
      this.toastrService.success(response.message, " Başarılı")
        }, responseError=> {
          this.toastrService.error(responseError.message, "Dikkat");
      })
  }


}
