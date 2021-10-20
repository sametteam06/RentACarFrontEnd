import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Displacement } from 'src/app/models/displacement';
import { DisplacementService } from 'src/app/services/displacement.service';

@Component({
  selector: 'app-displacement',
  templateUrl: './displacement.component.html',
  styleUrls: ['./displacement.component.css']
})
export class DisplacementComponent implements OnInit {

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
}
