import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthentificationComponent } from './auth/authentification/authentification.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login-register', component: AuthentificationComponent },
  { path: '', component: AuthentificationComponent},
  { path: 'dashboard', component: AdminDashboardComponent, /* ajouter middleware auth */ }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
