import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }

  createUser(userObj:any):Observable<any>{
    return this.hc.post("/user/create-user",userObj)
  }

  //make req to protected route
  getProtedtedData():Observable<any>{
    return this.hc.get("user/get-protected-data")
  }
}
