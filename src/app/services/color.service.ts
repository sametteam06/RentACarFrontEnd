import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiGetAllUrl = "https://localhost:44358/api/colors/getall"

  constructor(private httpClient:HttpClient) { }
  colorGetAll():Observable<listResponseModel<Color>>{
    return this.httpClient.get<listResponseModel<Color>>(this.apiGetAllUrl);
  }
}
