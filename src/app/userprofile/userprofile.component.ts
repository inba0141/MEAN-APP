import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  user;
  constructor(private authService:AuthenticationService,private us:UserService) { }

  ngOnInit(): void {
    this.user=this.authService.currentUser;
  }
  getPrivateData(){
    this.us.getProtedtedData().subscribe({
      next:(res)=>{
        alert(res.message);
      }
    })
  }
}
