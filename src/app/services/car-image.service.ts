import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { listResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { itemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44358/api/"
  constructor(private httpClient:HttpClient) { }
  getImages(carId:number):Observable<listResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getbycarid?id="+carId
    return this.httpClient.get<listResponseModel<CarImage>>(newPath)
  }
  add(selectedImage:File, carId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carimages/add";
    const formData: FormData = new FormData();
    formData.append('CarId', carId.toString());
    formData.append('Image',selectedImage);
    return this.httpClient.post<ResponseModel>(newPath, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }
  update(selectedImage:File, id:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carimages/update";
    const formData: FormData = new FormData();
    formData.append('Image',selectedImage);
    formData.append('Id', id.toString());
    return this.httpClient.post<ResponseModel>(newPath, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }
  delete(image:CarImage):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carimages/delete";
    return this.httpClient.post<ResponseModel>(newPath, image);
  }
  getById(id:number):Observable<itemResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getbyid?id="+id;
    return this.httpClient.get<itemResponseModel<CarImage>>(newPath)
  }
  getCarsFirstImageById(carId:number):Observable<itemResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getfirstimagebycarid?id="+carId;
    return this.httpClient.get<itemResponseModel<CarImage>>(newPath);
  }
}
