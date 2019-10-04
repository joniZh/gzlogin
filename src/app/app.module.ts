import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
// import {HttpClientModule } from '@angular/common/http';
import {AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule } from '@angular/fire/auth';
import {SocialLoginModule, AuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import {AutorizacionService} from './guard/autorizacion.service'; 
import { HttpModule} from '@angular/http';

/* Components */
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { environment } from 'src/environments/environment.prod';
import { UserService} from './shared/user.service';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { MAT_LABEL_GLOBAL_OPTIONS, MatCheckboxModule } from '@angular/material';
//instanciar las claves
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("147545804170-fa1ua89hin7rdob91v3kdk9ce637lq0u.apps.googleusercontent.com")
  }
]);
//esportamos las conf de claves
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    PerfilComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule, 
    MatCheckboxModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    // tslint:disable-next-line: deprecation
    HttpModule,
    AngularFireModule.initializeApp(environment. firebase),
    AngularFireAuthModule,
    NgxSpinnerModule

  ],
  providers: [UserService, AutorizacionService, {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
