import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../models/cliente';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {

  clientes: Cliente[] = new Array<Cliente>();
  @Input('nombre') nombre: string;
  @Output('seleccionoCliente') seleccionoCliente = new EventEmitter;
  @Output('canceloCliente') canceloCliente = new EventEmitter();

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection('clientes').get().subscribe((resultados)=>{

      this.clientes.length = 0;

      resultados.docs.forEach((item)=>{
        let cliente: any = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.push(cliente);
      });
      console.log(this.clientes);
    });
  }

  buscarClientes(nombre: string){
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLowerCase().includes(nombre.toLowerCase()))
      {
        cliente.visible = true;
      } 
      else
      {
        cliente.visible = false;
      }
    });
  }

  seleccionarCliente(cliente: Cliente) {
    this.nombre = cliente.nombre + ' ' + cliente.apellido;
    this.clientes.forEach((cliente)=>{
      cliente.visible = false;
    })

    this.seleccionoCliente.emit(cliente);
  }

  cancelarCliente()
  {
    this.nombre = undefined;
    this.canceloCliente.emit();
  }

}