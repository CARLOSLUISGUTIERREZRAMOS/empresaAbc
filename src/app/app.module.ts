import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Incluyendo NGX Bootstrap
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';

//Configurando Firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';

//Configurando FireAuth
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],  
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
