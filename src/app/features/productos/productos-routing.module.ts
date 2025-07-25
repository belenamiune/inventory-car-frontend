import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from '@features/productos/pages/listado/listado.component';
import { DetalleComponent } from '@features/productos/pages/detalle/detalle.component';

const routes: Routes = [
  { path: '', component: ListadoComponent },
  { path: ':id', component: DetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule {}
