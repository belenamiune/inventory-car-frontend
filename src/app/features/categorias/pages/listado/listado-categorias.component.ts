import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

import { Categoria } from '@shared/models/categoria.model';
import {
  loadPaginatedCategorias,
  deleteCategoria,
  updateCategoria,
  createCategoria
} from '@features/categorias/store/categorias.actions';
import {
  selectCategorias,
  selectCategoriasLoading,
  selectCategoriasTotal
} from '@features/categorias/store/categorias.selectors';

@Component({
  selector: 'app-categorias-listado',
  templateUrl: './listado-categorias.component.html'
})
export class ListadoCategoriasComponent implements OnInit {
  categorias$: Observable<Categoria[]> = this.store.select(selectCategorias).pipe(map(c => c || []));
  loading$: Observable<boolean> = this.store.select(selectCategoriasLoading);
  total$: Observable<number> = this.store.select(selectCategoriasTotal);

  nombre = '';
  padre = '';
  rows = 10;
  categoriaSeleccionada: Categoria | null = null;
  modalVisible = false;

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadPage(0);
  }

  loadPage(offset: number) {
    this.store.dispatch(
      loadPaginatedCategorias({
        limit: this.rows,
        offset,
        nombre: this.nombre || undefined,
        padre: this.padre || undefined
      })
    );
  }

  onBuscar() {
    this.loadPage(0);
  }

  resetFiltros() {
    this.nombre = '';
    this.padre = '';
    this.loadPage(0);
  }

  onPageChange(event: any) {
    this.loadPage(event.first);
  }

  abrirNuevo() {
    this.categoriaSeleccionada = null;
    this.modalVisible = true;
  }

  abrirEdicion(categoria: Categoria) {
    this.categoriaSeleccionada = categoria;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  confirmarEliminar(categoria: Categoria) {
    this.confirmationService.confirm({
      message: `¿Estás segura de eliminar "${categoria.nombre}"?`,
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary',
      accept: () => {
        this.store.dispatch(deleteCategoria({ id: categoria._id }));
      }
    });
  }

  guardarCategoria(categoria: Categoria) {
    if (categoria._id) {
        this.store.dispatch(updateCategoria({ categoria }));
    } else {
        this.store.dispatch(createCategoria({ categoria }));
    }
    this.cerrarModal();
    }
}
