import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createProducto, loadPaginatedProductos, updateProducto, deleteProducto } from '../../../../store/productos/productos.actions';
import {
  selectAllProductos,
  selectProductosLoading,
  selectProductosState,
} from '../../../../store/productos/productos.selector';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';
import { map } from 'rxjs/operators';
import { Categoria } from 'src/app/shared/models/categoria.model';
import { CategoriasService } from '../../../categorias/services/categorias.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {
  productos$: Observable<Producto[]> = this.store.select(selectAllProductos).pipe(
    map((productos) => productos || [])
  );
  loading$: Observable<boolean> = this.store.select(selectProductosLoading);
  total$: Observable<number> = this.store.select(selectProductosState).pipe(map((s) => s.total));
  nombre = '';
  categoria = '';
  rows = 10;
 categorias: Categoria[] = [];
 productoSeleccionado: Producto | null = null;
modalVisible = false;
  constructor(private store: Store,  private categoriasService: CategoriasService, private confirmationService: ConfirmationService, private router: Router) {}

  ngOnInit(): void {
    this.loadPage(0);
    this.categoriasService.getAll().subscribe((cats) => (this.categorias = cats));
  }

 loadPage(offset: number) {
    this.store.dispatch(
        loadPaginatedProductos({
        limit: this.rows,
        offset,
        nombre: this.nombre,
        categoria: this.categoria,
        })
    );
    }

  onBuscar() {
    this.loadPage(0);
  }

  resetFiltros() {
  this.nombre = '';
  this.categoria = '';
  this.loadPage(0);
}

verDetalle(producto: any) {
    console.log("pase", producto)
  this.router.navigate(['/productos', producto._id]);
}

  onPageChange(event: any) {
    this.loadPage(event.first);
  }

  abrirNuevo() {
    this.productoSeleccionado = null;
    this.modalVisible = true;
}

    abrirEdicion(producto: Producto) {
    this.productoSeleccionado = producto;
    this.modalVisible = true;
    }

    cerrarModal() {
    this.modalVisible = false;
    }

    guardarProducto(producto: Producto) {
    if (producto._id) {
        this.store.dispatch(updateProducto({ producto }));
    } else {
        this.store.dispatch(createProducto({ producto }));
    }
    this.cerrarModal();
    }

    confirmarEliminar(producto: Producto) {
    this.confirmationService.confirm({
        message: `¿Estás segura de eliminar "${producto.nombre}"?`,
        acceptLabel: 'Eliminar',
        rejectLabel: 'Cancelar',
        header: 'Confirmar eliminación',
        icon: 'pi pi-exclamation-triangle',
        
    acceptButtonStyleClass: 'p-button-danger',
    rejectButtonStyleClass: 'p-button-outlined p-button-secondary',
        accept: () => {
        this.store.dispatch(deleteProducto({ id: producto._id }));
        },
    });
    }
}
