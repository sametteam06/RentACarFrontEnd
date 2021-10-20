import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { itemResponseModel } from '../models/itemResponseModel';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44358/api/"

  constructor(private httpClient:HttpClient) { }
  brandGetAll():Observable<listResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getall";
    return this.httpClient.get<listResponseModel<Brand>>(newPath)
  }
  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
  getById(id:Number):Observable<itemResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getbyid?id="+id;
    return this.httpClient.get<itemResponseModel<Brand>>(newPath);
  }
  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/update";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
  delete(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/delete";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

}
