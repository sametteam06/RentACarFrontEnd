import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarMainPageDto } from '../models/carMainPageDto';
import { itemResponseModel } from '../models/itemResponseModel';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

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
  addCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  getCarsByDisplacement(id:number):Observable<listResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbydisplacementid?id="+id
    return this.httpClient.get<listResponseModel<Car>>(newPath);
  }
  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/delete";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  getById(id:number):Observable<itemResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbyid?id="+id;
    return this.httpClient.get<itemResponseModel<Car>>(newPath);
  }
  getDetails():Observable<listResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcarsdetail";
    return this.httpClient.get<listResponseModel<CarDetail>>(newPath);
  }
  getCarsForMainPage():Observable<listResponseModel<CarMainPageDto>>{
    let newPath = this.apiUrl + "cars/getcarsformainpage";
    return this.httpClient.get<listResponseModel<CarMainPageDto>>(newPath);
  }
  getCarsForMainPageByBrandId(id:number):Observable<listResponseModel<CarMainPageDto>>{
    let newPath = this.apiUrl + "cars/getcarsformainpagebybrandid?id="+id;
    return this.httpClient.get<listResponseModel<CarMainPageDto>>(newPath);
  }
  getCarsForMainPageByDisplacementId(id:number):Observable<listResponseModel<CarMainPageDto>>{
    let newPath = this.apiUrl + "cars/getcarsformainpagebydisplacementid?id="+id;
    return this.httpClient.get<listResponseModel<CarMainPageDto>>(newPath);
  }
}
