import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { UserOperationClaimDto } from 'src/app/models/userOperationClaimDto';
import { UsersAllClaims } from 'src/app/models/UsersAllClaims';
import { OperationClaimsService } from 'src/app/services/operation-claims.service';

@Component({
  selector: 'app-operation-claims',
  templateUrl: './operation-claims.component.html',
  styleUrls: ['./operation-claims.component.css']
})
export class OperationClaimsComponent implements OnInit {

  usersAllClaims :UsersAllClaims[];
  usersUOCList:UserOperationClaimDto[];
  dataLoaded:boolean = false;
  closeResult="";
  ifNoClaim="Yetkilendirilmemiş";
  userAllClaims:UsersAllClaims;
  claimIds:number[]=[0,0];
  userId:number;
  operationClaims:OperationClaim[]=[];
  addableClaims:OperationClaim[]=[];
  addClaimIds:number[] = [];


  constructor(private claimService:OperationClaimsService, private toastrService:ToastrService, private modalService:NgbModal) {  }
 

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.claimService.getUsersAllClaims().subscribe(response=>{
      this.usersAllClaims = response.data;
      this.dataLoaded = response.success;
      
    })
  }

  checkBoxChange(claimId:any){
    if(claimId.target.checked){
      let k=0;
        for(let i=0;i<this.claimIds.length;i++){
          if(this.claimIds[i]==0){
            k=i;
            break;
          }
        }
        this.claimIds[k]=claimId.target.value
    }else{
      for(let i=0;i<this.claimIds.length;i++){
        if(this.claimIds[i]==claimId.target.value){
          this.claimIds[i] = 0;
        }
      }
      for(let i=0;i<this.claimIds.length;i++){
        if(this.claimIds[i]==0){
          if(this.claimIds[i+1]){
            this.claimIds[i]=this.claimIds[i+1];
            this.claimIds[i+1]=0;
          }       
        }
      }
    }
  }
    
  deleteSubmit(){
    this.deleteClaim(this.userId);
  }

  addSubmit(){
    this.addClaim(this.userId);
  }

  addClaim(userId:number){
    for(let i = 0; i < this.claimIds.length; i++){
      if(this.claimIds[i]!=0){
        for(let k = 0; k < this.operationClaims.length; k++){
          if(this.claimIds[i]==this.operationClaims[k].id){
            this.addClaimToUser(userId, this.operationClaims[k].id);
          }
        }
      }
    }
  }

  addClaimToUser(userId:number, operationClaimId:number){
    let model:UserOperationClaim = {operationClaimId:operationClaimId, userId:userId, id:0}
    this.claimService.addClaimToUser(model).subscribe(response=>{
      this.toastrService.success(response.message, "İşlem Başarılı");
    })
  }

  deleteClaimToUser(userId:number, operationClaimId:number, userOperationClaimId:number){
    let model:UserOperationClaim = {operationClaimId:operationClaimId, userId:userId, id:userOperationClaimId}
    this.claimService.deleteClaimToUser(model).subscribe(response=>{
      this.toastrService.success(response.message, "İşlem Başarılı");
    }, responseError=>{
      this.toastrService.error(responseError.message, "İşlem Başarısız")
    })
  }

  addModal(content:any, userId:number) {
    this.setaddableClaims(userId);
    this.clearClaimIds();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.clearClaimIds();

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  setaddableClaims(userId:number){
    this.userId = userId;
    this.claimService.getOperationClaims().subscribe(response=>{
      this.operationClaims = response.data;
    })
    this.setUserClaimsDto(userId);
    this.addableClaims = this.operationClaims
    for(let i=0;i<this.userAllClaims.operationClaimId.length;i++){
      for(let k=0;k<this.operationClaims.length;k++){
        if(this.userAllClaims.operationClaimId[i]==this.operationClaims[k].id){
          for(let m=0;m<this.addableClaims.length;m++){
            if(this.operationClaims[k]==this.addableClaims[m]){
              this.addableClaims[m].id = 0;
            }
          }
        }
      }
    }
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

  deleteModal(content:any, userId:number) {
    this.setUserClaimsDto(userId);
    this.clearClaimIds();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  setUserClaimsDto(userId:number){
    this.userId=userId;
    for(let i=0;i<this.usersAllClaims.length; i++){
      if(userId == this.usersAllClaims[i].userId){
        this.userAllClaims = this.usersAllClaims[i];
      }
    }
  }
 
  clearClaimIds(){
      for(let i=0;i<this.userAllClaims.operationClaimName.length; i++){
        this.claimIds[i]=0;
      }
  }

  deleteClaim(userId:number){
    this.claimService.getUOCByUserId(userId).subscribe(response=>{
      this.usersUOCList = response.data;
      for (let i = 0; i<this.claimIds.length;i++){
        for (let k = 0; k<this.usersUOCList.length;k++){
          if(this.claimIds[i]==this.usersUOCList[k].operationClaimId){
            this.deleteClaimToUser(userId, this.usersUOCList[k].operationClaimId,this.usersUOCList[k].userOperationClaimId)
          }
        }
      }
    })
  }
  getOperationClaims(){
    this.claimService.getOperationClaims().subscribe(response=>{
      this.operationClaims = response.data;
    })
  }
  
}
