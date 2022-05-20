import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
//import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userCredentialsObj: FormGroup;
  errStatus: boolean;
  errMessage: any;

  constructor(private fb:FormBuilder,
    private authService:AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
    this.userCredentialsObj=this.fb.group({
      userType:'',
      username:'',
      password:''
    })
  }
  onFormSubmit(){
    console.log(this.userCredentialsObj.value)
    //if usertype is user
    if(this.userCredentialsObj.value.userType=='user'){
      this.authService.loginUser(this.userCredentialsObj.value).subscribe({
        next:(res)=>{
          if(res.message=="success"){
            this.errStatus=false;
            //get token from res obj
            let token=res.token;
            //store token
           localStorage.setItem("token",token)
           //update user login status
           this.authService.userLoginStatus=true;
           //get logedin user data
           this.authService.currentUser=res.user;
           //navigate to userdashboard
            this.router.navigateByUrl(`/userprofile/${res.user.username}`);

          }
          else{
            this.errStatus=true;
            this.errMessage=res.message;
          }
        },
        error:(err)=>{
          console.log(err)
          alert(err.message)
        }
      })
    }
    //if usertype is admin
    if(this.userCredentialsObj.value.userType=='admin'){
      this.authService.adminLogin(this.userCredentialsObj.value).subscribe({
        next:(res)=>{
          if(res.message=="success"){
            this.errStatus=false;
            //get token from res obj
            let token=res.token;
            //store token
           localStorage.setItem("token",token)
           //update user login status
           this.authService.adminLoginStatus=true;
           //get logedin user data
           this.authService.currentAdmin=res.admin;
           //navigate to userdashboard
            this.router.navigateByUrl("/productprofile");
          }
          else{
            this.errStatus=true;
            this.errMessage=res.message;
          }
        },
        error:(err)=>{
          console.log(err)
          alert(err.message)
        }
      })

    }

  }

}
