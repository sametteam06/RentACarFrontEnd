import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  currentBrand : Brand;
  brand : Brand;
  dataLoaded = false;
  brandFilterText = "";


  constructor(private brandService:BrandService) { }

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
}
