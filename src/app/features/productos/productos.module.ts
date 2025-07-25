import { NgModule } from '@angular/core';

import { ProductosRoutingModule } from '@features/productos/productos-routing.module';
import { ProductosComponent } from '@features/productos/productos.component';
import { ListadoComponent } from '@features/productos/pages/listado/listado.component';

import { ProductoFormComponent } from '@features/productos/components/producto-form/producto-form.component';
import { DetalleComponent } from '@features/productos/pages/detalle/detalle.component';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [ProductosComponent, ListadoComponent, ProductoFormComponent, DetalleComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductosRoutingModule
  ],
  providers: []
})
export class ProductosModule {}
