import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './views/shared/navbar/navbar.component';

import { LoginComponent} from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthentificationComponent } from './auth/authentification/authentification.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Importez AngularFireAuth depuis '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { RelaisComponent } from './views/components/relais/relais.component';
import { CompaniesComponent } from './views/components/companies/companies.component';
import { ProductsComponent } from './views/components/products/products.component';
import { ConfigurationsComponent } from './views/components/configurations/configurations.component';
import { CalendarComponent } from './views/components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'; // Importez MatTabsModule depuis '@angular/material/tabs'

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AuthentificationComponent,
    CompaniesComponent,
    ConfigurationsComponent,
    CalendarComponent,
    RelaisComponent,
    ProductsComponent
      ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    ToastrModule.forRoot()   
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
