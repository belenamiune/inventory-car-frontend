import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleComponent } from './detalle.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductosService } from '@features/productos/services/productos.service';
import { MovimientosService } from '@features/productos/services/movimientos.service';
import { selectAllProductos } from '@features/productos/store/productos.selector';
import { Producto } from '@features/productos/models/producto.model';
import { Movimiento } from '@shared/models/movimiento.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('DetalleComponent', () => {
  let component: DetalleComponent;
  let fixture: ComponentFixture<DetalleComponent>;
  let store: MockStore;
  let productosService: jasmine.SpyObj<ProductosService>;
  let movimientosService: jasmine.SpyObj<MovimientosService>;

  const mockProducto: Producto = {
    _id: '1',
    nombre: 'Producto 1',
    categorias: [],
    stock: 2,
    precio: 10
  };

  const mockMovimientos: Movimiento[] = [
    { productoId: 'm1', tipo: 'alta', fecha: new Date().toISOString(), cantidad: 5 }
  ];

  beforeEach(async () => {
    const productosServiceSpy = jasmine.createSpyObj('ProductosService', ['getById']);
    const movimientosServiceSpy = jasmine.createSpyObj('MovimientosService', ['getByProductoId']);

    await TestBed.configureTestingModule({
      declarations: [DetalleComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectAllProductos,
              value: []
            }
          ]
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1'
            })
          }
        },
        { provide: ProductosService, useValue: productosServiceSpy },
        { provide: MovimientosService, useValue: movimientosServiceSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    productosService = TestBed.inject(ProductosService) as jasmine.SpyObj<ProductosService>;
    movimientosService = TestBed.inject(MovimientosService) as jasmine.SpyObj<MovimientosService>;

    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar producto desde el servicio si no está en el store', done => {
    const productoMock = { ...mockProducto };
    productosService.getById.and.returnValue(of(productoMock));
    movimientosService.getByProductoId.and.returnValue(of([]));

    fixture.detectChanges();

    component.producto$?.subscribe(producto => {
      expect(producto).toEqual(productoMock);
      expect(productosService.getById).toHaveBeenCalledWith('1');
      done();
    });
  });

  it('debería cargar movimientos del producto', () => {
    movimientosService.getByProductoId.and.returnValue(of(mockMovimientos));
    productosService.getById.and.returnValue(of(mockProducto));

    fixture.detectChanges();

    expect(movimientosService.getByProductoId).toHaveBeenCalledWith('1');
  });

  it('debería usar el producto del store si está presente', done => {
    const productoEnStore: Producto = {
      _id: '1',
      nombre: 'Del Store',
      categorias: [],
      precio: 0,
      stock: 0
    };

    store.overrideSelector(selectAllProductos, [productoEnStore]);
    store.refreshState();

    movimientosService.getByProductoId.and.returnValue(of([]));

    fixture = TestBed.createComponent(DetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.producto$?.subscribe(producto => {
      expect(producto).toEqual(productoEnStore);
      expect(productosService.getById).not.toHaveBeenCalled();
      done();
    });
  });
});
