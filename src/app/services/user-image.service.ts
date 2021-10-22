import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { itemResponseModel } from '../models/itemResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserImage } from '../models/userImage';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  apiUrl = "http://rentacarproject.abdulsametozdemir.com/api/"

  constructor(private httpClient:HttpClient) { }


  getByUserId(id:number):Observable<itemResponseModel<UserImage>>{
    let newPath = this.apiUrl + "userimages/getbyuserid?id="+id;
    return this.httpClient.get<itemResponseModel<UserImage>>(newPath);
  }
  add(selectedImage:File, userId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "userimages/add";
    const formData: FormData = new FormData();
    formData.append('UserId', userId.toString());
    formData.append('Image',selectedImage);
    return this.httpClient.post<ResponseModel>(newPath, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }
}
