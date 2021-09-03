import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { listResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiGetAllUrl = "https://localhost:44358/api/brands/getall"

  constructor(private httpClient:HttpClient) { }
  brandGetAll():Observable<listResponseModel<Brand>>{
    return this.httpClient.get<listResponseModel<Brand>>(this.apiGetAllUrl)
  }
}
