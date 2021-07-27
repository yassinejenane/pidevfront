import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 //the variable/formControl first name is the user name which is nedded to
  loginForm: FormGroup
  isLoggedIn = false;
  swal: any;
  constructor(private fb : FormBuilder, private userService : UserService, private router:Router,private toastr: ToastrService ) { 
    let formControls={
      firstname:new FormControl('',[
        Validators.required,
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ])
    }
    this.loginForm = this.fb.group(formControls)
  }

  get firstname(){return this.loginForm.get('firstname')}
  get password(){return this.loginForm.get('password')}
  ngOnInit(): void {

  }

  async login() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

      const data = this.loginForm.value;
  
      await this.userService.login(data.firstname , data.password).subscribe(
        async res => {
          console.log(res);
          // tslint:disable-next-line:prefer-const
          let Authorization = res.Authorization;
          const IdUser = res.id;
          const role = res.role;
          const firstname = data.firstname;
          const mail = res.mail;
          const name = res.name;
          const phone = res.phone;
          const address = res.address;
          const lastname = res.lastname;
          localStorage.setItem('Authorization', Authorization);
          localStorage.setItem('IdUser', IdUser);
          localStorage.setItem('role', role);
          localStorage.setItem('firstname', firstname);
          localStorage.setItem('lastname', lastname);
          localStorage.setItem('mail', mail);
          localStorage.setItem('name', name);
          localStorage.setItem('phone', phone);
          localStorage.setItem('address', address);
          await this.router.navigate(['/profile']);
          //await location.reload();
          
        },
        err => {
          
          console.log(err);
          this.toastr.error('Check your credentils');
        }
      );  
        
    }

  }

