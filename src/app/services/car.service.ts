import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44358/api/"

  constructor(private httpClient:HttpClient) { }
  carGetAll():Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getall"
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }
  getCarsByBrand(id:number):Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrandid?id="+id
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }
  getCarsBycolor(id:number):Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbycolorid?id="+id
    return this.httpClient.get<listResponseModel<Car>>(newPath)
  }
}
