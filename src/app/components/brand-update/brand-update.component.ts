import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  currentBrand:Brand;
  showContent:boolean = false;
  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private brandService:BrandService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getById(params["id"])
  })
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }
  getById(id:Number){
    this.brandService.getById(id).subscribe(response=>{
      this.currentBrand = response.data;
    })
  }
  updateBrand(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      brandModel.id = this.currentBrand.id;
      this.brandService.updateBrand(brandModel).subscribe(response=>{
        this.toastrService.success(response.message, " Başarılı");
        this.activatedRoute;
        this.showContent=true;
      }, responseError=> {
        this.toastrService.error("Formunuz Eksik", "Dikkat");
      })
    }
  }
}
