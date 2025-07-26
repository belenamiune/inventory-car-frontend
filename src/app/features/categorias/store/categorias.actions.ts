import { createAction, props } from '@ngrx/store';
import { Categoria } from '@shared/models/categoria.model';

export const loadCategorias = createAction('[Categorias] Load');
export const loadCategoriasSuccess = createAction(
  '[Categorias] Load Success',
  props<{ categorias: Categoria[] }>()
);
export const loadCategoriasFailure = createAction(
  '[Categorias] Load Failure',
  props<{ error: any }>()
);

export const loadPaginatedCategorias = createAction(
  '[Categorias] Load Paginated',
  props<{ limit: number; offset: number; nombre?: string; padre?: string | null }>()
);

export const loadPaginatedCategoriasSuccess = createAction(
  '[Categorias] Load Paginated Success',
  props<{ data: Categoria[]; total: number }>()
);

export const loadPaginatedCategoriasFailure = createAction(
  '[Categorias] Load Paginated Failure',
  props<{ error: any }>()
);

export const createCategoria = createAction(
  '[Categorias] Create',
  props<{ categoria: Categoria }>()
);

export const createCategoriaSuccess = createAction(
  '[Categorias] Create Success',
  props<{ categoria: Categoria }>()
);

export const createCategoriaFailure = createAction(
  '[Categorias] Create Failure',
  props<{ error: any }>()
);

export const updateCategoria = createAction(
  '[Categorias] Update',
  props<{ categoria: Categoria }>()
);

export const updateCategoriaSuccess = createAction(
  '[Categorias] Update Success',
  props<{ categoria: Categoria }>()
);

export const updateCategoriaFailure = createAction(
  '[Categorias] Update Failure',
  props<{ error: any }>()
);

export const deleteCategoria = createAction(
  '[Categorias] Delete',
  props<{ id: string }>()
);

export const deleteCategoriaSuccess = createAction(
  '[Categorias] Delete Success',
  props<{ id: string }>()
);

export const deleteCategoriaFailure = createAction(
  '[Categorias] Delete Failure',
  props<{ error: any }>()
);