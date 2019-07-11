import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './layout/nav/nav.component';
import {HomeModule} from './home/home.module';
import {HomeRoutingModule} from './home/home-routing.module';
import { ListeMembresComponent } from './membres/liste-membres/liste-membres.component';
import { DetailsMembreComponent } from './membres/details-membre/details-membre.component';
import {MembresModule} from './membres/membres.module';
import {MembresRoutingModule} from './membres/membres-routing.module';
import {HandleError, HttpErrorHandlerService} from './shared/http-error-handler.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {AppHttpInterceptorService} from './shared/http-interceptor.service';
import {AuthService} from './auth/auth.service';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListeDepensesComponent } from './depenses/liste-depenses/liste-depenses.component';
import {DepensesRoutingModule} from './depenses/depenses-routing.module';
import { DetailsDepenseComponent } from './depenses/details-depense/details-depense.component';
import { AboutDepenseComponent} from './depenses/details-depense/about-depense/about-depense.component';
import { EditDepenseComponent } from './depenses/details-depense/edit-depense/edit-depense.component';
import { DeleteDepenseComponent } from './depenses/details-depense/delete-depense/delete-depense.component';
import { AddDepenseComponent } from './depenses/add-depense/add-depense.component';
import {NgbModalBackdrop} from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ListeMembresComponent,
    DetailsMembreComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ListeDepensesComponent,
    DetailsDepenseComponent,
    AboutDepenseComponent,
    EditDepenseComponent,
    DeleteDepenseComponent,
    AddDepenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HomeModule,
    HomeRoutingModule,
    MembresModule,
    MembresRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DepensesRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [Title, AuthService, HttpErrorHandlerService , {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
