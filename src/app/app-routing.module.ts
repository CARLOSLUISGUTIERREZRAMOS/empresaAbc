import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoEmpleadosComponent } from './listado-empleados/listado-empleados.component';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'registrar', pathMatch: 'full'
  },
  {
    path: 'registrar', component: RegistrarComponent
  },
  {
    path: 'listado-empleados' , component: ListadoEmpleadosComponent
  },
  {
    path: 'agregar-empleado', component: AgregarEmpleadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
