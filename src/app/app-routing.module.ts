import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginRegisterComponent} from './auth/login-register/login-register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login-register', component: LoginRegisterComponent },
  { path: '', component: LoginRegisterComponent},
  { path: 'dashboard', component: AdminDashboardComponent, /* ajouter middleware auth */ }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
