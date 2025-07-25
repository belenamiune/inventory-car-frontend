import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductosState } from '@features/productos/store';

export const selectProductosState = createFeatureSelector<ProductosState>('productos');

export const selectAllProductos = createSelector(selectProductosState, state => state.productos);

export const selectProductosLoading = createSelector(selectProductosState, state => state.loading);

export const selectTotalProductos = createSelector(
  selectAllProductos,
  productos => productos.length
);

export const selectStockBajo = createSelector(
  selectAllProductos,
  productos => productos.filter(p => p.stock < 5).length
);

export const selectValorInventario = createSelector(selectAllProductos, productos =>
  productos.reduce((total, p) => total + p.stock * p.precio, 0)
);

export const selectProductosError = createSelector(selectProductosState, state => state.error);
