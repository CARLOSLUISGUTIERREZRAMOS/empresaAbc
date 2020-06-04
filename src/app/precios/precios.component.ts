import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { MensajesService } from '../services/mensajes.service';
import { R3FactoryDelegateType } from '@angular/compiler/src/render3/r3_factory';
import { Precio } from '../models/precio';


@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formularioPrecio: FormGroup;
  precios: Precio[] = new Array<Precio>();
  esEditar: boolean = false;
  id: string;
  
  constructor(
    private fb:FormBuilder, 
    private db: AngularFirestore,
    private msj: MensajesService
    ) { }

  ngOnInit() {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    });

    this.mostrarPrecios();

  }
  
  mostrarPrecios(){
    this.db.collection<Precio>('precios').get().subscribe((resultado)=>{
      this.precios.length = 0;
      resultado.docs.forEach((dato)=>{
        let precio = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio);
      })
    })
  }

  agregar()
  {
    this.db.collection('precios').add(this.formularioPrecio.value).then(()=>{
      this.msj.mensajeCorrecto('Agregado', 'Se agregó correctamente');
    }).catch(()=>{
      this.msj.mensajeCorrecto('Error', 'No se pudo agregar el precio.');
    });
    this.mostrarPrecios();
    
  }

  editarPrecio(precio: Precio)
  {
    this.esEditar = true;

    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })

    this.id = precio.id;
  }

  editar(){
    this.db.doc('precios/' + this.id).update(this.formularioPrecio.value).then(()=>{
      this.msj.mensajeCorrecto('Editado', 'Se editó correctamente');
      this.formularioPrecio.reset();
      this.esEditar = false;
      this.mostrarPrecios();
    }).catch(()=>{
      this.msj.mensajeError('Error', 'Ocurrió un error');
    });
  }

}
