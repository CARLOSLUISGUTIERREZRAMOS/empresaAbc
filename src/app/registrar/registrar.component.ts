import { Component, OnInit } from '@angular/core';
import { Registrar } from '../models/registrar';
import { AngularFirestore } from 'angularfire2/firestore';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  registrar: Registrar = new Registrar();
  constructor(private db: AngularFirestore, private msj: MensajesService) { }

  ngOnInit() {
  
  }
}
