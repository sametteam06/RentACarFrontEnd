import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { itemResponseModel } from '../models/itemResponseModel';
import { UpdateEmailModel } from '../models/updateEmailModel';
import { UpdateNameModel } from '../models/updateNameModel';
import { UpdatePwModel } from '../models/updatePwModel';
import { UserDetail } from '../models/userDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = "http://rentacarproject.abdulsametozdemir.com/api/"

  getUserByMail(mail:string|null):Observable<itemResponseModel<UserDetail>>{
    let newPath = this.apiUrl + "users/getbymail?mail="+mail
    return this.httpClient.get<itemResponseModel<UserDetail>>(newPath);
  }
  getById(id:number):Observable<itemResponseModel<UserDetail>>{
    let newPath = this.apiUrl + "users/getbyid?id="+id
    return this.httpClient.get<itemResponseModel<UserDetail>>(newPath)
  }
  updateEmail(model:UpdateEmailModel):Observable<itemResponseModel<UserDetail>>{
    let newPath = this.apiUrl + "users/changeemail";
    return this.httpClient.post<itemResponseModel<UserDetail>>(newPath, model);
  }
  updateName(model:UpdateNameModel):Observable<itemResponseModel<UserDetail>>{
    let newPath = this.apiUrl + "users/changename";
    return this.httpClient.post<itemResponseModel<UserDetail>>(newPath, model);
  }
  updatePw(model:UpdatePwModel):Observable<itemResponseModel<UserDetail>>{
    let newPath = this.apiUrl + "users/changepw";
    return this.httpClient.post<itemResponseModel<UserDetail>>(newPath, model);
  }
}
