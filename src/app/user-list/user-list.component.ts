import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userlist=[];
  constructor(private userService : UserService,
    private router:Router,
    private route:ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    let isAdmin=this.userService.isAdmin()
    if(isAdmin){
    this.userService.getAllUsers().subscribe(
      res=>{
        this.userlist = res;
        console.log(this.userlist);
      },
      err=>{
        console.log(err);
      }
    )
    }
    
  }
  delete(event: any) {
    console.log(event.target.id); 
    var id : number;
    id= event.target.id;
    let ath = <string>localStorage.getItem("Authorization");
    let isLoggedIn=this.userService.isLoggedIn()
    let isAdmin=this.userService.isAdmin()
    
    //let id = this.route.snapshot.params.id;
    //let id = <string>localStorage.getItem("IdUser");
    //console.log(this.updateForm.value);
    //let data = this.updateForm.value ;
    //console.log(data.firstname, data.lastname, data.password);
       
    if(isLoggedIn && isAdmin)
    {
        
        //id = this.getId(document.getElementsByName("edit"));
        this.userService.userDelete(id).subscribe(
        result=>{
          console.log(result);
          console.log(id);
          this.toastr.success('User deleted successfully !');
          location.reload();
        },
      error=>{
        console.log(error);
        console.log(id);
        console.log('access_toke: ', localStorage.getItem('Authorization'));
        
      }
    )
  }else if (isLoggedIn && isAdmin == false){
    
    this.router.navigate(['/profile']);
    
  }

 }
 

}
