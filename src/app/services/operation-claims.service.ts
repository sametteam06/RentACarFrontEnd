import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { itemResponseModel } from '../models/itemResponseModel';
import { listResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { UserOperationClaim } from '../models/userOperationClaim';
import { UserOperationClaimDto } from '../models/userOperationClaimDto';
import { UsersAllClaims } from '../models/UsersAllClaims';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimsService {

  apiUrl = "http://rentacarproject.abdulsametozdemir.com/api/"
  constructor(private httpClient:HttpClient) { }
  

  getClaimsDetail():Observable<listResponseModel<UserOperationClaimDto>>{
    let newPath = this.apiUrl + "claims/getdetail";
    return this.httpClient.get<listResponseModel<UserOperationClaimDto>>(newPath);
  }
  addClaimToUser(entity:UserOperationClaim):Observable<ResponseModel>{
    let newPath = this.apiUrl + "claims/add"
    console.log(entity)
    return this.httpClient.post<ResponseModel>(newPath, entity);
  }
  deleteClaimToUser(entity:UserOperationClaim):Observable<ResponseModel>{
    let newPath = this.apiUrl + "claims/delete"
    console.log(entity)
    return this.httpClient.post<ResponseModel>(newPath, entity);
  }
  getUsersAllClaims():Observable<listResponseModel<UsersAllClaims>>{
    let newPath = this.apiUrl + "claims/getallclaimsforallusers";
    return this.httpClient.get<listResponseModel<UsersAllClaims>>(newPath);
  }
  getUserClaimDetailByUserId(id:number):Observable<itemResponseModel<UsersAllClaims>>{
    let newPath = this.apiUrl + "claims/getdetailbyuserid?id="+id;
    return this.httpClient.get<itemResponseModel<UsersAllClaims>>(newPath)
  }
  getUOCByUserId(userId:number):Observable<listResponseModel<UserOperationClaimDto>>{
    let newPath = this.apiUrl + "claims/getuocbyuserid?id="+userId;
    return this.httpClient.get<listResponseModel<UserOperationClaimDto>>(newPath);
  }
  getOperationClaims():Observable<listResponseModel<OperationClaim>>{
    let newPath = this.apiUrl + "claims/getoperationclaims";
    return this.httpClient.get<listResponseModel<OperationClaim>>(newPath);
  }
}
