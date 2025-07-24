import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ListadoComponent } from './pages/listado/listado.component';

import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    ProductosComponent,
    ListadoComponent,
    ProductoFormComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    TableModule,
    PaginatorModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    MultiSelectModule,
    DialogModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    TagModule,
    CardModule,
    PanelModule
  ],
  providers: [ConfirmationService]
})
export class ProductosModule { }
