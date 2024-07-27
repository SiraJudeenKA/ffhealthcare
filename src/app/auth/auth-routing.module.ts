import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from '../shared/home/home.component';
import { authGuard } from './auth-constant/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'home', canActivate: [authGuard], component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
