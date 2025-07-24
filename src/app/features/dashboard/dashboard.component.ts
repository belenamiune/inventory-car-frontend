import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectTotalProductos,
  selectStockBajo,
  selectValorInventario,
  selectProductosLoading,
  selectProductosState,
  selectAllProductos,
} from '../../store/productos/productos.selector';
import { loadProductos } from '../../store/productos/productos.actions';
import { map, Observable } from 'rxjs';
import { Categoria } from 'src/app/shared/models/categoria.model';
import { Producto } from '../productos/models/producto.model';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { CategoriasService } from '../categorias/services/categorias.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  total$: Observable<number> = this.store.select(selectTotalProductos);
  stockBajo$: Observable<number> = this.store.select(selectStockBajo);
  valorInventario$: Observable<number> = this.store.select(selectValorInventario);
  loading$: Observable<boolean> = this.store.select(selectProductosLoading);
  error$: Observable<string | null> = this.store
    .select(selectProductosState)
    .pipe(map(s => s.error));

  // Chart
  
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  public barChartType: ChartType = 'bar';
  barChartOptions: ChartConfiguration['options'] = { responsive: true };
  barChartData: ChartData<'bar'> = {
  labels: ['Lubricantes', 'Filtros', 'Repuestos'],
    datasets: [
        { data: [10, 5, 7], label: 'Productos por Categoría' }
    ]
    };

  constructor(private store: Store,  private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.store.dispatch(loadProductos());

     this.store.select(selectAllProductos).subscribe(productos => {
      this.productos = productos;
      this.procesarGrafico();
    });

       this.categoriasService.getAll().subscribe(cats => {
      this.categorias = cats;
      this.procesarGrafico();
    });
  }

   procesarGrafico() {
    if (!this.productos.length || !this.categorias.length) return;

    const stockPorCategoria: { [nombre: string]: number } = {};

    this.categorias.forEach(cat => {
      stockPorCategoria[cat.nombre] = 0;
    });

    this.productos.forEach(prod => {
      prod.categorias?.forEach(cat => {
        const categoria = this.categorias.find(c => c._id === cat._id);
        if (categoria) {
          stockPorCategoria[categoria.nombre] += prod.stock;
        }
      });
    });

    this.barChartData.labels = Object.keys(stockPorCategoria);
    this.barChartData.datasets[0].data = Object.values(stockPorCategoria);
  }

}
