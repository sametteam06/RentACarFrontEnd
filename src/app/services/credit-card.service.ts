import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { itemResponseModel } from '../models/itemResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = "https://localhost:44358/api/"

  constructor(private httpClient:HttpClient) { }
  
  add(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "creditcards/add";
    return this.httpClient.post<ResponseModel>(newPath, creditCard, {
      reportProgress: true,
      responseType: 'json'
    });
  }
  getByUserId(id:number):Observable<itemResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcards/getbyid?id=" + id;
    return this.httpClient.get<itemResponseModel<CreditCard>>(newPath);
  }
  delete(creditCard:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "creditcards/delete";
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }
}
