import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductosService } from '../../features/productos/services/productos.service';
import * as ProductosActions from './productos.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductosEffects {
  constructor(
    private actions$: Actions,
    private productosService: ProductosService
  ) {}

  loadProductos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductosActions.loadProductos),
      mergeMap(() =>
        this.productosService.getAll().pipe(
          map((productos) =>
            ProductosActions.loadProductosSuccess({
                productos,
                total: 0
            })
          ),
          catchError((error) =>
            of(ProductosActions.loadProductosFailure({ error: error.message }))
          )
        )
      )
    )
  );

 loadPaginated$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ProductosActions.loadPaginatedProductos),
        mergeMap(({ limit, offset, nombre, categoria }) =>
        this.productosService.getPaginated(limit, offset, nombre, categoria).pipe(
            map((response) =>
            ProductosActions.loadProductosSuccess({
                productos: response.data,
                total: response.total,
            })
            ),
            catchError((error) =>
                of(ProductosActions.loadProductosFailure({ error: error.message }))
             )
            )
         )
        )
    );

 createProducto$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ProductosActions.createProducto),
        mergeMap(({ producto }) =>
        this.productosService.create(producto).pipe(
            map((nuevo) => ProductosActions.createProductoSuccess({ producto: nuevo })),
            catchError((err) =>
            of(ProductosActions.createProductoFailure({ error: err.message }))
            )
        )
        )
    )
    );

 updateProducto$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ProductosActions.updateProducto),
        mergeMap(({ producto }) =>
        this.productosService.update(producto).pipe(
            map((actualizado) =>
            ProductosActions.updateProductoSuccess({ producto: actualizado })
            ),
            catchError((err) =>
            of(ProductosActions.updateProductoFailure({ error: err.message }))
            )
        )
        )
    )
    );

deleteProducto$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductosActions.deleteProducto),
    mergeMap(({ id }) =>
      this.productosService.delete(id).pipe(
        map(() => ProductosActions.deleteProductoSuccess({ id })),
        catchError((err) =>
          of(ProductosActions.deleteProductoFailure({ error: err.message }))
        )
      )
    )
  )
);


}
