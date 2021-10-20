import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DisplacementService } from 'src/app/services/displacement.service';

@Component({
  selector: 'app-displacement-add',
  templateUrl: './displacement-add.component.html',
  styleUrls: ['./displacement-add.component.css']
})
export class DisplacementAddComponent implements OnInit {

  displacementAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private displacementService:DisplacementService) { }

  ngOnInit(): void {
    this.createDisplacementAddForm();
  }
  createDisplacementAddForm(){
    this.displacementAddForm = this.formBuilder.group({
      engineDisplacement:["",Validators.required]
    })
  }
  addDisplacement(){
    if(this.displacementAddForm.valid){
      let displacementModel = Object.assign({}, this.displacementAddForm.value);
      this.displacementService.add(displacementModel).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı")
      }, responseError=> {
        this.toastrService.error("Formunuz Eksik", "Dikkat");
      })
    }

  }

}
