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
