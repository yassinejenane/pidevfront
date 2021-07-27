import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 //the variable/formControl first name is the user name which is nedded to logIn
 registerForm: FormGroup
 constructor(private fb : FormBuilder, private userService : UserService,
  private router:Router,
  private toastr: ToastrService)
  { 
   let formControls={
     firstname:new FormControl('',[
       Validators.required,
       Validators.minLength(4)
     ]),
     password: new FormControl('',[
       Validators.required,
       Validators.minLength(4)
     ]),
     repeatpassword: new FormControl('',[
       Validators.required,
       Validators.minLength(4)
     ]),
     lastname: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("[a-z A-Z .'-]+")
    ]),
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("[a-z A-Z .'-]+")
    ]),
    mail: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(13),
      Validators.pattern("[0-9 +]+")
    ]),
    address: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ])

   }
   this.registerForm = this.fb.group(formControls)
  }

  get firstname(){return this.registerForm.get('firstname')}
  get password(){return this.registerForm.get('password')}
  get lastname(){return this.registerForm.get('lastname')}
  get name(){return this.registerForm.get('name')}
  get mail(){return this.registerForm.get('mail')}
  get phone(){return this.registerForm.get('phone')}
  get address(){return this.registerForm.get('address')}
  get repeatpassword(){return this.registerForm.get('repeatpassword')}
  
  

  ngOnInit(): void {
  }
  Register(){
    console.log(this.registerForm.value);
}
  createUsers(){
    let isAdmin=this.userService.isAdmin()
    let isLoggedIn=this.userService.isLoggedIn()
    let data = this.registerForm.value ;
    let user = new User(true,data.firstname,data.name,data.mail,data.phone,data.address, data.lastname, data.password);
    if(isAdmin){
    this.userService.createAdmin(user).subscribe(
      result=>{
        this.toastr.success('Admin registration is done successfully !');
        this.router.navigate(['userliste'])
      },
      error=>{
        console.log(error);
        this.toastr.error('Account with Username '+ data.firstname +' already exist !');
      }
    )
    }else{
      this.userService.createUser(user).subscribe(
        result=>{
          this.toastr.success('Register done successfully !');
          this.router.navigate(['login'])
        },
        error=>{
          console.log(error);
          this.toastr.error('Account with Username '+ data.firstname +' already exist !');
        }
      )
    }
  }
}