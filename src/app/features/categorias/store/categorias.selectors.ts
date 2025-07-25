import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriaState } from './categorias.reducer';

export const selectCategoriaState = createFeatureSelector<CategoriaState>('categorias');

export const selectCategorias = createSelector(
  selectCategoriaState,
  (state) => state.categorias
);

export const selectCategoriasLoading = createSelector(
  selectCategoriaState,
  (state) => state.loading
);
