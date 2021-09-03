import { ResponseModel } from "./responseModel";

export interface itemResponseModel<T> extends ResponseModel{
data:T
}