import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private userService : UserService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.isAdmin = this.userService.isAdmin();

  }


  async logout() {
    localStorage.clear();
    await location.reload();
    await this.router.navigate(['/login']);
    await location.reload();

  }
}
