import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Empresa ABC';
  usuario: User;
  cargando: boolean = true;

  constructor(public afAuth: AngularFireAuth)
  {
    this.afAuth.user.subscribe((usuario)=>{
			this.cargando = false;
			this.usuario  = usuario;
    });
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword('empresaabc@gmail.com', '123456 ');
  }
}
