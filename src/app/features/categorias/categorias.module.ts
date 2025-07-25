import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoriasRoutingModule } from '@features/categorias/categorias-routing.module';
import { CategoriasComponent } from '@features/categorias/categorias.component';
import { ArbolComponent } from '@features/categorias/pages/arbol/arbol.component';


import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CategoriasComponent, ArbolComponent],
  imports: [SharedModule, CategoriasRoutingModule, CommonModule
  ]
})
export class CategoriasModule {}
