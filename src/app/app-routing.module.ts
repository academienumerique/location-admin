import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Page de connexion comme page d'accueil
 // { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  // Ajoutez d'autres routes ici
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
