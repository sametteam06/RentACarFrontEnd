import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { itemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardetailService {
  apiUrl = "https://localhost:44358/api/"

  constructor(private httpClient:HttpClient) { }
  getByCarId(id:number):Observable<itemResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetailbyid?id="+id
    return this.httpClient.get<itemResponseModel<CarDetail>>(newPath);
  }

}
