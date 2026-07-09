import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { Home } from './home/home';
import { Details } from './details/details';
import { Login } from './login/login';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'home',
    component: Home
  },
  {
    path: 'details/:id',
    component: Details
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }