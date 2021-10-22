import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiGetAllUrl = "http://rentacarproject.abdulsametozdemir.com/api/customers/getall"

  constructor(private httpClient:HttpClient) { }
  customerGetAll():Observable<listResponseModel<Customer>>{
    return this.httpClient.get<listResponseModel<Customer>>(this.apiGetAllUrl);
  }
}
