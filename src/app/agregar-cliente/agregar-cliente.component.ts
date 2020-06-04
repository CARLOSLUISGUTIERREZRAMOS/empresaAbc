import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';


@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  urlImagen: string = '';
  esEditable: boolean = false;
  id: string;

  constructor(
    private fb: FormBuilder, 
    private storage: AngularFireStorage, 
    private db: AngularFirestore,
    private activateRoute: ActivatedRoute,
    private msj: MensajesService
  ) { }

  ngOnInit() {
    
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      urlImg: ['', Validators.required]
    });

    // console.log(this.activateRoute.snapshot.params.clienteID);
    this.id = this.activateRoute.snapshot.params.clienteID;

    if (this.id != undefined) {
      this.db.doc<any>('clientes/' + this.id).valueChanges().subscribe((cliente)=>{
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          cedula: cliente.cedula,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substring(0,10),
          telefono: cliente.telefono,
          urlImg: ''
        })
      });

      this.esEditable = true;
    }
  }

  agregar()
  {
    this.formularioCliente.value.urlImg = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    this.db.collection('clientes').add(this.formularioCliente.value).then((termino)=>{
      this.msj.mensajeCorrecto('Exito', 'Se agrego al cliente');
    });
  }

  editar()
  {
    this.formularioCliente.value.urlImg = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    console.log(this.formularioCliente.value);
    
    this.db.doc('cliente/' + this.id).update(this.formularioCliente.value).then((resultado)=>{
      this.msj.mensajeCorrecto('Editado', 'Cliente editado correctamente');
    }).catch(()=>{
      this.msj.mensajeError('Error', 'Ocurrió un error al actualizar el cliente');
    });
  }

  subirImagen(evento)
  {
    if (evento.target.files.length > 0) {
      let nombre    = new Date().getTime().toString();
      let archivo   = evento.target.files[0];
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));
      
      let ruta    = 'clientes/' + nombre + extension;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then((objeto)=>{
        referencia.getDownloadURL().subscribe((url)=>{
          this.urlImagen = url;
        });
        
      })
      tarea.percentageChanges().subscribe((porcentaje)=>{
        this.porcentajeSubida = parseInt(porcentaje.toString());
      })
    }

  }

}
