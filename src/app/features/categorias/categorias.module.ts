import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { SharedModule } from '@shared/shared.module';
import { CategoriasRoutingModule } from '@features/categorias/categorias-routing.module';
import { CategoriasComponent } from '@features/categorias/categorias.component';
import { ArbolComponent } from '@features/categorias/pages/arbol/arbol.component';
import { CategoriaFormComponent } from '@features/categorias/components/categoria-form/categoria-form.component';
import { ListadoCategoriasComponent } from '@features/categorias/pages/listado/listado-categorias.component';

@NgModule({
  declarations: [CategoriasComponent, ArbolComponent, ListadoCategoriasComponent, CategoriaFormComponent],
  imports: [SharedModule, CategoriasRoutingModule, CommonModule
  ]
})
export class CategoriasModule {}
