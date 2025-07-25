import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  selectTotalProductos,
  selectStockBajo,
  selectValorInventario,
  selectProductosLoading,
  selectProductosState,
  loadProductos
} from '@features/productos/store';
import { loadCategorias } from '@features/categorias/store';
import { selectCategorias } from '@app/features/categorias/store/categorias.selectors';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  total$: Observable<number> = this.store.select(selectTotalProductos);
  stockBajo$: Observable<number> = this.store.select(selectStockBajo);
  valorInventario$: Observable<number> = this.store.select(selectValorInventario);
  loading$: Observable<boolean> = this.store.select(selectProductosLoading);
  error$: Observable<string | null> = this.store
    .select(selectProductosState)
    .pipe(map(s => s.error));
  categorias$: Observable<any[]> = this.store.select(selectCategorias);

// Charts
stockChartData = {
  labels: ['Disponible', 'Out of stock',],
  datasets: [
    {
      data: [6, 2],
      backgroundColor: ['#818CF8', '#F87171'],
      hoverBackgroundColor: [, '#6366F1', '#EF4444']
    }
  ]
};

stockChartOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#374151'
      }
    }
  },
  responsive: true
};

productosPorCategoriaData = {
  labels: [] as string[],
  datasets: [
    {
      label: 'Cantidad de Productos',
      backgroundColor: '#6366F1',
      borderColor: '#6366F1',
      data: [] as number[]
    }
  ]
};

productosPorCategoriaOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#374151', 
        font: {
          size: 12
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#374151'
      },
      grid: {
        color: '#E5E7EB'
      }
    },
    y: {
      ticks: {
        color: '#374151'
      },
      grid: {
        color: '#E5E7EB'
      }
    }
  }
};

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadProductos());
    this.store.dispatch(loadCategorias()); 

     this.categorias$.subscribe(categorias => {
    this.productosPorCategoriaData.labels = categorias.map(cat => cat.nombre);
    this.productosPorCategoriaData.datasets[0].data = categorias.map(cat => cat.productos?.length || 0);
  });
  }

  getCategoriaStyles(nombre: string): { bg: string; text: string; icon: string } {
  switch (nombre.toLowerCase()) {
    case 'lubricantes':
      return {
        bg: 'bg-blue-100 dark:bg-blue-900',
        text: 'text-blue-700 dark:text-blue-300',
        icon: 'pi pi-car'
      };
    case 'filtros':
      return {
        bg: 'bg-purple-100 dark:bg-purple-900',
        text: 'text-purple-700 dark:text-purple-300',
        icon: 'pi pi-filter'
      };
    case 'repuestos':
      return {
        bg: 'bg-yellow-100 dark:bg-yellow-900',
        text: 'text-yellow-800 dark:text-yellow-300',
        icon: 'pi pi-cog'
      };
    default:
      return {
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-700 dark:text-gray-300',
        icon: 'pi pi-tag'
      };
  }
}

}
