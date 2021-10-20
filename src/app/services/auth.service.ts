import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { itemResponseModel } from '../models/itemResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44358/api/"

  constructor(private httpClient:HttpClient) { }

  login(user:User):Observable<itemResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "auth/login";
    return this.httpClient.post<itemResponseModel<TokenModel>>(newPath, user);
  }
  register(user:User):Observable<itemResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "auth/register";
    return this.httpClient.post<itemResponseModel<TokenModel>>(newPath, user);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("mail");
  }
}
