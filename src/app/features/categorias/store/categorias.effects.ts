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

  constructor(private actions$: Actions, private categoriasService: CategoriasService) {}
}
