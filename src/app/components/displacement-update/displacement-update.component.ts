import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Displacement } from 'src/app/models/displacement';
import { DisplacementService } from 'src/app/services/displacement.service';

@Component({
  selector: 'app-displacement-update',
  templateUrl: './displacement-update.component.html',
  styleUrls: ['./displacement-update.component.css']
})
export class DisplacementUpdateComponent implements OnInit {

  displacementUpdateForm:FormGroup;
  currentDisplacement:Displacement;
  showContent:boolean = false;
  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private displacementService:DisplacementService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getById(params["id"])
  })
    this.createDisplacementAddForm();
  }
  createDisplacementAddForm(){
    this.displacementUpdateForm = this.formBuilder.group({
      engineDisplacement:["",Validators.required]
    })
  }
  getById(id:Number){
    this.displacementService.getById(id).subscribe(response=>{
      this.currentDisplacement = response.data;
    })
  }
  updateDisplacement(){
    if(this.displacementUpdateForm.valid){
      let displacementModel = Object.assign({}, this.displacementUpdateForm.value);
      displacementModel.id = this.currentDisplacement.id;
      this.displacementService.update(displacementModel).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı");
        this.activatedRoute;
        this.showContent=true;
      }, responseError=> {
        this.toastrService.error("Formunuz Eksik", "Dikkat");
      })
    }
  }
}
