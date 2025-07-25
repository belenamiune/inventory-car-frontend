import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectTotalProductos,
  selectStockBajo,
  selectValorInventario,
  selectProductosLoading,
  selectProductosState
} from '../../store/productos/productos.selector';
import { loadProductos } from '../../store/productos/productos.actions';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  total$: Observable<number> = this.store.select(selectTotalProductos);
  stockBajo$: Observable<number> = this.store.select(selectStockBajo);
  valorInventario$: Observable<number> = this.store.select(selectValorInventario);
  loading$: Observable<boolean> = this.store.select(selectProductosLoading);
  error$: Observable<string | null> = this.store
    .select(selectProductosState)
    .pipe(map(s => s.error));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadProductos());
  }
}
