import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Producto } from '../../models/producto.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { selectAllProductos } from '../../../../store/productos/productos.selector';
import { ProductosService } from '../../services/productos.service';
import { MovimientosService } from '../../services/movimientos.service';
import { Movimiento } from 'src/app/shared/models/movimiento.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {
  producto$: Observable<Producto | undefined> | undefined;
  movimientos: Movimiento[] = [];


  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private productosService: ProductosService,
    private movimientosService: MovimientosService
  ) {}

  
  ngOnInit(): void {
    this.producto$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id')!;
        this.loadMovimientos(id);
        return this.store.select(selectAllProductos).pipe(
          switchMap((productos) => {
            const encontrado = productos.find((p) => p._id === id);
            return encontrado
              ? of(encontrado)
              : this.productosService.getById(id); 
          })
        );
      })
    );
  }

  loadMovimientos(id: string) {
  this.movimientosService.getByProductoId(id).subscribe((data) => {
    this.movimientos = data;
  });
}
}
