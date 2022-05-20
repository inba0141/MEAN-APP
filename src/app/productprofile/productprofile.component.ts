import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-productprofile',
  templateUrl: './productprofile.component.html',
  styleUrls: ['./productprofile.component.scss']
})
export class ProductprofileComponent implements OnInit {
  admin;

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.admin=this.authService.currentAdmin;
  }

}
