import { createReducer, on } from '@ngrx/store';
import * as ProductosActions from './productos.actions';
import { initialProductosState } from './productos.state';

export const productosReducer = createReducer(
  initialProductosState,

  on(ProductosActions.loadProductos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductosActions.loadProductosSuccess, (state, { productos, total }) => ({
    ...state,
    productos,
    total,
    loading: false,
  })),

  on(ProductosActions.loadProductosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

 on(ProductosActions.createProductoSuccess, (state, { producto }) => ({
    ...state,
    productos: [...state.productos, producto],
 })),

 on(ProductosActions.updateProductoSuccess, (state, { producto }) => ({
    ...state,
    productos: state.productos.map((p) =>
        p._id === producto._id ? producto : p
    ),
 })),

 on(ProductosActions.deleteProductoSuccess, (state, { id }) => ({
  ...state,
  productos: state.productos.filter((p) => p._id !== id),
}))

);
