import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
      
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
