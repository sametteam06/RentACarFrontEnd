import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { itemResponseModel } from '../models/itemResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { OperationClaimsService } from './operation-claims.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://rentacarproject.abdulsametozdemir.com/api/"

  constructor(private httpClient:HttpClient, private userService:UserService, private operationClaimService:OperationClaimsService) { }

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
  authControl(){
    let mail = localStorage.getItem("mail");
      this.userService.getUserByMail(mail).subscribe(responseUser=>{
        this.operationClaimService.getUOCByUserId(responseUser.data.id).subscribe(responseClaim=>{
          for(let i=0; i<responseClaim.data.length; i++){
            if(responseClaim.data[i].operationClaimName=="admin"){
              localStorage.setItem("auth", "admin")
            }
          }
        })
      });
  }
  isAdmin(){
    if(localStorage.getItem("auth")=="admin"){
      return true;
    }else{
      return false;
    }
  }
  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("mail");
    localStorage.removeItem("auth")
  }
}
