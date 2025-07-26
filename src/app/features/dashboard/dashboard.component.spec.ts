import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { loadProductos } from '@features/productos/store';
import { loadCategorias } from '@features/categorias/store';
import { selectCategorias } from '@app/features/categorias/store/categorias.selectors';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const mockCategorias = [
    { nombre: 'Lubricantes', productos: [{}, {}] },
    { nombre: 'Filtros', productos: [{}] },
    { nombre: 'Repuestos', productos: [] }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectCategorias, value: mockCategorias }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProductos and loadCategorias on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(loadProductos());
    expect(dispatchSpy).toHaveBeenCalledWith(loadCategorias());
  });

  it('should update productosPorCategoriaData from categorias$', () => {
    const labels = component.productosPorCategoriaData.labels;
    const data = component.productosPorCategoriaData.datasets[0].data;

    expect(labels).toEqual(['Lubricantes', 'Filtros', 'Repuestos']);
    expect(data).toEqual([2, 1, 0]);
  });

  it('should return correct styles for each categoria', () => {
    expect(component.getCategoriaStyles('lubricantes')).toEqual({
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-700 dark:text-blue-300',
      icon: 'pi pi-car'
    });

    expect(component.getCategoriaStyles('Filtros')).toEqual({
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-700 dark:text-purple-300',
      icon: 'pi pi-filter'
    });

    expect(component.getCategoriaStyles('Repuestos')).toEqual({
      bg: 'bg-yellow-100 dark:bg-yellow-900',
      text: 'text-yellow-800 dark:text-yellow-300',
      icon: 'pi pi-cog'
    });

    expect(component.getCategoriaStyles('otro')).toEqual({
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-700 dark:text-gray-300',
      icon: 'pi pi-tag'
    });
  });
});
