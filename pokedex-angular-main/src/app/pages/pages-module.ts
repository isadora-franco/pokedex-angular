import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { Home } from './home/home';
import { RoutingModule } from './routing-module';
import { Details } from './details/details';
import { SharedModule } from '../shared/shared-module';
import { Login } from './login/login';

@NgModule({
  declarations: [
    Home,
    Details,
    Login,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule, 
    ReactiveFormsModule

  ]
})
export class PagesModule { }