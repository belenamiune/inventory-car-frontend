import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoCategoriasComponent } from '@features/categorias/pages/listado/listado-categorias.component';
import { ArbolComponent } from '@features/categorias/pages/arbol/arbol.component';

const routes: Routes = [{ path: '', component: ListadoCategoriasComponent }, { path: 'arbol', component: ArbolComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule {}
