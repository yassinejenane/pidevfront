import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders , HttpParams } from '@angular/common/http'
import { User } from '.././user';
import { AuthenticationRequest } from '.././AuthenticationRequest';
import { UserService } from '../user.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ProfileComponent implements OnInit {
  //private firstname : string ;
  isAdmin = false;
  firstname = <string>localStorage.getItem("firstname");
  name = <string>localStorage.getItem("name");
  lastname = <string>localStorage.getItem("lastname");
  mail = <string>localStorage.getItem("mail");
  phone = <string>localStorage.getItem("phone");
  address = <string>localStorage.getItem("address");
  id = <string>localStorage.getItem("IdUser");

  
  constructor(private userService : UserService, private router:Router) { 
    //this.firstname = firstname;
  }

  ngOnInit(): void {
    
    this.isAdmin = this.userService.isAdmin();
  }

  
}

