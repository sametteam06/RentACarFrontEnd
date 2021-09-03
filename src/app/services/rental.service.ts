import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiGetAllUrl = "https://localhost:44358/api/rentals/getall"
  apiGetDetailUrl = "https://localhost:44358/api/rentals/getdetail"

  constructor(private httpClient:HttpClient) { }
  rentalGetAll():Observable<listResponseModel<Rental>>{
    return this.httpClient.get<listResponseModel<Rental>>(this.apiGetAllUrl);
  }
  rentalGetDetail():Observable<listResponseModel<Rental>>{
    return this.httpClient.get<listResponseModel<Rental>>(this.apiGetDetailUrl);
  }
}
