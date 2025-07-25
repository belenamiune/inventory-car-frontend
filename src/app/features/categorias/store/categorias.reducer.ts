import { createReducer, on } from '@ngrx/store';
import * as CategoriaActions from './categorias.actions';
import { Categoria } from '@shared/models/categoria.model';

export interface CategoriaState {
  categorias: Categoria[];
  loading: boolean;
  error: any;
}

export const initialState: CategoriaState = {
  categorias: [],
  loading: false,
  error: null
};

export const categoriasReducer = createReducer(
  initialState,
  on(CategoriaActions.loadCategorias, state => ({
    ...state,
    loading: true
  })),
  on(CategoriaActions.loadCategoriasSuccess, (state, { categorias }) => ({
    ...state,
    categorias,
    loading: false
  })),
  on(CategoriaActions.loadCategoriasFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
