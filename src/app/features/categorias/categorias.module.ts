import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { ArbolComponent } from './pages/arbol/arbol.component';

import { TreeModule } from 'primeng/tree';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    CategoriasComponent,
    ArbolComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    TreeModule,
    CardModule
  ]
})
export class CategoriasModule { }
