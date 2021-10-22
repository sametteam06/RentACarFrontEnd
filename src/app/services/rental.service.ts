import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiGetAllUrl = "http://rentacarproject.abdulsametozdemir.com/api/rentals/getall"
  apiGetDetailUrl = "http://rentacarproject.abdulsametozdemir.com/api/rentals/getdetail"
  apiUrl = "http://rentacarproject.abdulsametozdemir.com/api/"
  result:ResponseModel
  rentalCar:Rental;
  carId:number;

  constructor(private httpClient:HttpClient) { }
  rentalGetAll():Observable<listResponseModel<Rental>>{
    return this.httpClient.get<listResponseModel<Rental>>(this.apiGetAllUrl);
  }
  rentalGetDetail():Observable<listResponseModel<RentalDto>>{
    return this.httpClient.get<listResponseModel<RentalDto>>(this.apiGetDetailUrl);
  }
  addRental(): Observable<ResponseModel> {
    let newPath = this.apiUrl + "rentals/add";
    return this.httpClient.post<ResponseModel>(newPath, this.rentalCar)
  }
  setDates(rentDate:Date, returnDate:Date, id:number){
    this.rentalCar = {carId:this.carId, userId:id, rentDate:rentDate, returnDate:returnDate};
    console.log(this.rentalCar);
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
