import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders , HttpParams } from '@angular/common/http'
import { User } from '.././user';
import { AuthenticationRequest } from '.././AuthenticationRequest';
import { UserService } from '../user.service';
import { LoginComponent } from '../login/login.component';



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
  firstname = <string>localStorage.getItem("firstname");
  name = <string>localStorage.getItem("name");
  lastname = <string>localStorage.getItem("lastname");
  mail = <string>localStorage.getItem("mail");
  phone = <string>localStorage.getItem("phone");
  address = <string>localStorage.getItem("address");
  id = <string>localStorage.getItem("IdUser");
  constructor(private userService : UserService) { 
    //this.firstname = firstname;
  }

  ngOnInit(): void {
    this.info();
  }

  info(){
  console.log("helloooo",localStorage);
  //this.firstname =  <string>localStorage.getItem("firstname");
  //const IdUser = <string>localStorage.getItem("firstname");
  
  }

}

