import { Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders , HttpParams } from '@angular/common/http'
import { User } from './user';
import { AuthenticationRequest } from './AuthenticationRequest';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private createuserUrl = "http://localhost:8087/createuser" ; 
  private authenticate = "http://localhost:8087/authenticate" ; 
  private uupdateUrlxx = "http://127.0.0.1:8087/user/Usersput" ;
  private uupdateAdminUrl = "http://127.0.0.1:8087/user/Adminput" ;
  private userlist = "http://localhost:8087/getall" ;
  private deleteUrl = "http://localhost:8087/user/Usersdel" ;
  private createadminrUrl = "http://localhost:8087/createadmin" ; 
  token = localStorage.getItem('Authorization');

  constructor(private http:HttpClient ) {
    
   }

   userDelete(id:number){
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.set('Authorization', 'Bearer ' + this.token);
    headers.append('Authorization','Bearer ' + this.token);

    let params = new HttpParams();
    params = params.append('id', id);
     let data = this.http.delete<any>(this.deleteUrl+"/"+id , {headers } );
     return data ;
   }

  getAllUsers(){
    let data = this.http.get<any>(this.userlist);
    return data;
  }

  public createUser(user:any){
    return this.http.post<any>(this.createuserUrl,user);
  }

  public createAdmin(user:any){
    return this.http.post<any>(this.createadminrUrl,user);
  }

  public uupdate (user:any , id:string){

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.set('Authorization', 'Bearer ' + this.token);
    headers.append('Authorization','Bearer ' + this.token);

    let params = new HttpParams();
    params = params.append('id', id);
    
    return this.http.put<any>(this.uupdateUrlxx+"/"+id ,user, {headers });  
    
  }

  public uupdateAdmin (user:any , id:string){

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.set('Authorization', 'Bearer ' + this.token);
    headers.append('Authorization','Bearer ' + this.token);

    let params = new HttpParams();
    params = params.append('id', id);
    
    return this.http.put<any>(this.uupdateAdminUrl+"/"+id ,user, {headers });  
    
  }

  login(username: any,  password: any) {
    // let params = new HttpParams();
    // params = params.append('username', username);
    // params = params.append('password', password);
    const autentification = new AuthenticationRequest(username, password );

    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Authorization', ``);
    

    // tslint:disable-next-line:object-literal-shorthand
    const  res = this.http.post<any>(this.authenticate , autentification  );
    return res ;
  }
  isLoggedIn() {
    const token = localStorage.getItem('Authorization');
    if (token) {
      return true ;
    } else {
      return false;
    }
  }

  isAdmin() {
    const role = localStorage.getItem('role');
    if (role == "ROLE_ADMIN" ) {
      return true ;
    } else {
      return false;
    }
  }


}
