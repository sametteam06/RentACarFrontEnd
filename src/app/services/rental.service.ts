import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiGetAllUrl = "https://localhost:44358/api/rentals/getall"
  apiGetDetailUrl = "https://localhost:44358/api/rentals/getdetail"
  apiUrl = "https://localhost:44358/api/"
  result:ResponseModel
  rentalCar:Rental;
  carId:number;

  constructor(private httpClient:HttpClient) { }
  rentalGetAll():Observable<listResponseModel<Rental>>{
    return this.httpClient.get<listResponseModel<Rental>>(this.apiGetAllUrl);
  }
  rentalGetDetail():Observable<listResponseModel<Rental>>{
    return this.httpClient.get<listResponseModel<Rental>>(this.apiGetDetailUrl);
  }
  addRental(): Observable<ResponseModel> {
    let newPath = this.apiUrl + "rentals/add";
    return this.httpClient.post<ResponseModel>(newPath, this.rentalCar)
  }
  setDates(rentDate:Date, returnDate:Date){
    this.rentalCar = {carId:this.carId, customerId:2002, rentDate:rentDate, returnDate:returnDate};
  }
  setCarId(carId:number){
    this.carId = carId;
  }
  getRental(){
    return this.rentalCar;
  }
  checkRental():Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/rentalable";
    return this.httpClient.post<ResponseModel>(newPath, this.rentalCar);
  }
  payment():Observable<boolean>{
    let newPath = this.apiUrl + "rentals/payment";
    return this.httpClient.get<boolean>(newPath);
  }

}
