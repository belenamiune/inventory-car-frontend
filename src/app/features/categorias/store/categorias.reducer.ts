import { createReducer, on } from '@ngrx/store';
import * as CategoriaActions from './categorias.actions';
import { Categoria } from '@shared/models/categoria.model';

export interface CategoriaState {
  categorias: Categoria[];
  loading: boolean;
  error: any;
  total: number;
}

export const initialState: CategoriaState = {
  categorias: [],
  loading: false,
  error: null,
  total: 0
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
  })),
    on(CategoriaActions.loadPaginatedCategorias, state => ({
    ...state,
    loading: true
  })),
  on(CategoriaActions.loadPaginatedCategoriasSuccess, (state, { data, total }) => ({
    ...state,
    categorias: data,
    total,
    loading: false
  })),
  on(CategoriaActions.loadPaginatedCategoriasFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CategoriaActions.createCategoriaSuccess, (state, { categoria }) => ({
  ...state,
  categorias: [categoria, ...state.categorias],
  loading: false
})),

on(CategoriaActions.updateCategoriaSuccess, (state, { categoria }) => ({
  ...state,
  categorias: state.categorias.map(c => (c._id === categoria._id ? categoria : c)),
  loading: false
})),

on(CategoriaActions.deleteCategoriaSuccess, (state, { id }) => ({
  ...state,
  categorias: state.categorias.filter(c => c._id !== id),
  loading: false
}))
);

