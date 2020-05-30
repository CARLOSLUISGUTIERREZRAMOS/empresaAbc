import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';

  constructor(public afAuth: AngularFireAuth)
  {
    // Mostrando data observable
    // this.afAuth.user.subscribe((usuario)=>{
    //   console.log(usuario);
    // });
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword('carlos.luis.gutierrez.ramos@gmail.com', 'dragon_1689');
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
