import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private hc:HttpClient) { }
  createProduct(productObj:any):Observable<any>{
    return this.hc.post("/admin/create-product",productObj)
  }
}
