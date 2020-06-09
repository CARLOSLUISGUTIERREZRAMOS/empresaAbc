import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
          
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListadoEmpleadosComponent } from './listado-empleados/listado-empleados.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MensajesService } from './services/mensajes.service';
import { RegistrarComponent } from './registrar/registrar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    ListadoEmpleadosComponent,
    AgregarEmpleadoComponent,
    RegistrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    BsDropdownModule.forRoot(),
    FormsModule,
    ProgressbarModule.forRoot(),
    AngularFireStorageModule
  ], 
  providers: [
    AngularFireAuth, 
    AngularFirestore,
    MensajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
