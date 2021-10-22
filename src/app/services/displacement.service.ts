import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Displacement } from '../models/displacement';
import { itemResponseModel } from '../models/itemResponseModel';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DisplacementService {
  apiUrl = "http://rentacarproject.abdulsametozdemir.com/api/"

  constructor(private httpClient:HttpClient) { }
  getAll():Observable<listResponseModel<Displacement>>{
    let newPath = this.apiUrl + "displacements/getall";
    return this.httpClient.get<listResponseModel<Displacement>>(newPath)
  }
  add(displacement:Displacement):Observable<ResponseModel>{
    let newPath = this.apiUrl + "displacements/add";
    return this.httpClient.post<ResponseModel>(newPath, displacement);
  }
  getById(id:Number):Observable<itemResponseModel<Displacement>>{
    let newPath = this.apiUrl + "displacements/getbyid?id="+id;
    return this.httpClient.get<itemResponseModel<Displacement>>(newPath);
  }
  update(displacement:Displacement):Observable<ResponseModel>{
    let newPath = this.apiUrl + "displacements/update";
    return this.httpClient.post<ResponseModel>(newPath, displacement);
  }
  delete(displacement:Displacement):Observable<ResponseModel>{
    let newPath = this.apiUrl + "displacements/delete";
    return this.httpClient.post<ResponseModel>(newPath, displacement);
  }
}
