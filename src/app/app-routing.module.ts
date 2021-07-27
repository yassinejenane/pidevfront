import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ProfileComponent } from './profile/profile.component';
import { UupdateComponent } from './uupdate/uupdate.component';
import { AuthGuard } from './auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'test',
    component: TestComponent
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate :[AuthGuard]
  },
  {
    path:'uupdate/:id',
    component: UupdateComponent,
    canActivate :[AuthGuard]
  },
  {
    path:'userliste',
    component: UserListComponent,
    canActivate :[AuthGuard,AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
