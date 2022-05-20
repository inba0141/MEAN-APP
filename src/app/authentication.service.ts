import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLoginStatus:boolean=false;
  adminLoginStatus:boolean=false;
  currentUser;
  currentAdmin;
  constructor(private hc:HttpClient) { }
  loginUser(userCredObj):Observable<any>{

    return this.hc.post('/user/login-user',userCredObj)

  }
  adminLogin(productCredObj):Observable<any>{
    return this.hc.post('/product/login-admin',productCredObj)
  }
  logoutUser(){
    localStorage.removeItem("token");
    this.userLoginStatus=false;
  }
  logoutAdmin(){
    localStorage.removeItem("token");
    this.adminLoginStatus=false;
  }
}
