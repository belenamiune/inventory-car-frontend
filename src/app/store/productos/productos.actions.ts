import { createAction, props } from '@ngrx/store';
import { Producto } from '../../features/productos/models/producto.model';

export const loadProductos = createAction('[Productos] Load');

export const loadProductosSuccess = createAction(
  '[Productos] Load Success',
  props<{ productos: Producto[]; total: number }>()
);

export const loadProductosFailure = createAction(
  '[Productos] Load Failure',
  props<{ error: string }>()
);

export const loadPaginatedProductos = createAction(
  '[Productos] Load Paginated',
  props<{ limit: number; offset: number; nombre?: string; categoria?: string }>()
);

export const createProducto = createAction('[Productos] Create', props<{ producto: Producto }>());

export const createProductoSuccess = createAction(
  '[Productos] Create Success',
  props<{ producto: Producto }>()
);

export const createProductoFailure = createAction(
  '[Productos] Create Failure',
  props<{ error: string }>()
);

export const updateProducto = createAction('[Productos] Update', props<{ producto: Producto }>());

export const updateProductoSuccess = createAction(
  '[Productos] Update Success',
  props<{ producto: Producto }>()
);

export const updateProductoFailure = createAction(
  '[Productos] Update Failure',
  props<{ error: string }>()
);

export const deleteProducto = createAction('[Productos] Delete', props<{ id: string }>());

export const deleteProductoSuccess = createAction(
  '[Productos] Delete Success',
  props<{ id: string }>()
);

export const deleteProductoFailure = createAction(
  '[Productos] Delete Failure',
  props<{ error: string }>()
);
