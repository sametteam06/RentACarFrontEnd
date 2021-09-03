import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44358/api/"
  constructor(private httpClient:HttpClient) { }
  getImages(carId:number):Observable<listResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getbycarid?id="+carId
    return this.httpClient.get<listResponseModel<CarImage>>(newPath)
  }
}
