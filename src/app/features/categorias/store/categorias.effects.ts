import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoriaActions from './categorias.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CategoriasService } from '../services/categorias.service';

@Injectable()
export class CategoriasEffects {
  loadCategorias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriaActions.loadCategorias),
      mergeMap(() =>
        this.categoriasService.getAll().pipe(
          map(resp => CategoriaActions.loadCategoriasSuccess({ categorias: resp.data })),
          catchError(error => of(CategoriaActions.loadCategoriasFailure({ error })))
        )
      )
    )
  );

  loadPaginatedCategorias$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoriaActions.loadPaginatedCategorias),
    mergeMap(({ limit, offset, nombre, padre }) =>
      this.categoriasService.getAll({ limit, offset, nombre, padre }).pipe(
        map(resp =>
          CategoriaActions.loadPaginatedCategoriasSuccess({
            data: resp.data,
            total: resp.total
          })
        ),
        catchError(error => of(CategoriaActions.loadPaginatedCategoriasFailure({ error })))
      )
    )
  )
);

createCategoria$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoriaActions.createCategoria),
    mergeMap(({ categoria }) =>
      this.categoriasService.create(categoria).pipe(
        map(resp => CategoriaActions.createCategoriaSuccess({ categoria: resp })),
        catchError(error => of(CategoriaActions.createCategoriaFailure({ error })))
      )
    )
  )
);

updateCategoria$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoriaActions.updateCategoria),
    mergeMap(({ categoria }) =>
      this.categoriasService.update(categoria).pipe(
        map(resp => CategoriaActions.updateCategoriaSuccess({ categoria: resp })),
        catchError(error => of(CategoriaActions.updateCategoriaFailure({ error })))
      )
    )
  )
);

deleteCategoria$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoriaActions.deleteCategoria),
    mergeMap(({ id }) =>
      this.categoriasService.delete(id).pipe(
        map(() => CategoriaActions.deleteCategoriaSuccess({ id })),
        catchError(error => of(CategoriaActions.deleteCategoriaFailure({ error })))
      )
    )
  )
);

  constructor(private actions$: Actions, private categoriasService: CategoriasService) {}
}
