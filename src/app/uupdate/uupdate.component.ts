import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpHeaders } from '@angular/common/http';
import { UserUpdate } from '../UserUpdate';

@Component({
  selector: 'app-uupdate',
  templateUrl: './uupdate.component.html',
  styleUrls: ['./uupdate.component.css']
})
export class UupdateComponent implements OnInit {
  updateForm: FormGroup
  isAdmin = false;
  constructor(private fb : FormBuilder, private userService : UserService,
    private router:Router,
    private route:ActivatedRoute,
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
       Validators.minLength(2),
       Validators.maxLength(30)
     ])
   
      }
      this.updateForm = this.fb.group(formControls)
     }
  get firstname(){return this.updateForm.get('firstname')}
  get password(){return this.updateForm.get('password')}
  get lastname(){return this.updateForm.get('lastname')}
  get name(){return this.updateForm.get('name')}
  get mail(){return this.updateForm.get('mail')}
  get phone(){return this.updateForm.get('phone')}
  get address(){return this.updateForm.get('address')}
  get repeatpassword(){return this.updateForm.get('repeatpassword')}

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    
    console.log(id);
    let isLoggedIn=this.userService.isLoggedIn()
    this.isAdmin = this.userService.isAdmin();
    if(isLoggedIn && this.isAdmin==false){
    this.updateForm.patchValue({
      firstname : <string>localStorage.getItem("firstname"),
      lastname : <string>localStorage.getItem("lastname"),
      name : <string>localStorage.getItem("name"),
      mail : <string>localStorage.getItem("mail"),
      phone : <string>localStorage.getItem("phone"),
      address : <string>localStorage.getItem("address")
    })
  }
  }
  uupdate(){
    let ath = <string>localStorage.getItem("Authorization");
    let isLoggedIn=this.userService.isLoggedIn()
    let isAdmin=this.userService.isAdmin()
    let id = this.route.snapshot.params.id;
    console.log(this.updateForm.value);
    //let data = this.updateForm.value ;
    //console.log(data.firstname, data.lastname, data.password);
    //let user = new UserUpdate( data.lastname, 
     // data.password,
      //data.name,
      //data.mail,
      //data.phone,
      //data.address);
       
    if (isLoggedIn){
    let data = this.updateForm.value ;
    let user = new UserUpdate( data.firstname,
      data.lastname, 
      data.password,
      data.name,
      data.mail,
      data.phone,
      data.address);
    this.userService.uupdate(user,id).subscribe(
      result=>{
        //const firstname = data.firstname;
        const lastname = data.lastname;
        const name = data.name;
        const mail = data.mail;
        const phone = data.phone;
        const address = data.address;
        //const name = res.name;
        //localStorage.setItem('firstname', firstname);
        localStorage.setItem('lastname', lastname);
        localStorage.setItem('name', name);
        localStorage.setItem('mail', mail);
        localStorage.setItem('phone', phone);
        localStorage.setItem('address', address);

        this.toastr.success('Information of user '+data.firstname+' updated successfully !');
        this.router.navigate(['profile'])
      },
    error=>{
      console.log(error);
      console.log('access_toke: ', localStorage.getItem('Authorization'));
      this.toastr.error('Account with Username '+ data.firstname +' already exist !');
    }
  )
  }

}
}
