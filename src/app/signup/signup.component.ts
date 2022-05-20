import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userFormInfo:FormGroup;
  errStatus:boolean=false;
  errMsg:string='';
  image:File;
  constructor(private fb:FormBuilder,private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userFormInfo=this.fb.group({
      username:'',
      password:'',
      email:'',
      city:'',
      profilePic:''
    })
  }
  onFormSubmit(){

    //get user obj from form
    let userObj=this.userFormInfo.value;
    //create formdata object
    let formData=new FormData();
    //append userobj to formdata
    formData.append('userObj',JSON.stringify(userObj))
    //APPEND PROFILE PIC TO FORM DATA
    formData.append('profilePic',this.image)
   // console.log(this.userObj.value)
   this.us.createUser(formData).subscribe({
     next:(res)=>{
      if(res.message=="User created"){
        this.errStatus=false;
        //navigate to login component
        this.router.navigateByUrl("/login")
      }
      else{
        this.errStatus=true;
        this.errMsg=res.message;
      }
     },
     error:(err)=>{
      console.log(err);
     }
   })
  }
  onFileSelect(event){
    //console.log(event.target.files[0]);
    this.image=event.target.files[0];
  }

}
