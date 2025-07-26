import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoComponent } from './listado.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { loadPaginatedProductos, createProducto, updateProducto } from '@features/productos/store';

import { loadCategorias } from '@app/features/categorias/store';

describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;
  let store: MockStore;
  let router: Router;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;

  const initialState = {
    productos: {
      productos: [],
      loading: false,
      error: null,
      total: 0
    },
    categorias: {
      categorias: []
    }
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const confirmationSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    await TestBed.configureTestingModule({
      declarations: [ListadoComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: routerSpy },
        { provide: ConfirmationService, useValue: confirmationSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    confirmationService = TestBed.inject(
      ConfirmationService
    ) as jasmine.SpyObj<ConfirmationService>;
    fixture = TestBed.createComponent(ListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a loadPage y loadCategorias al iniciar', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      loadPaginatedProductos({
        limit: component.rows,
        offset: 0,
        nombre: '',
        categoria: ''
      })
    );
    expect(dispatchSpy).toHaveBeenCalledWith(loadCategorias());
  });

  it('debería llamar a loadPage desde onBuscar', () => {
    const spy = spyOn(component, 'loadPage');
    component.onBuscar();
    expect(spy).toHaveBeenCalledWith(0);
  });

  it('debería resetear filtros y llamar a loadPage desde resetFiltros', () => {
    component.nombre = 'algo';
    component.categoria = 'otra';
    const spy = spyOn(component, 'loadPage');
    component.resetFiltros();
    expect(component.nombre).toBe('');
    expect(component.categoria).toBe('');
    expect(spy).toHaveBeenCalledWith(0);
  });

  it('debería navegar a detalle del producto', () => {
    const productoMock = { _id: '123' };
    component.verDetalle(productoMock);
    expect(router.navigate).toHaveBeenCalledWith(['/productos', '123']);
  });

  it('debería abrir modal en modo nuevo', () => {
    component.abrirNuevo();
    expect(component.modalVisible).toBeTrue();
    expect(component.productoSeleccionado).toBeNull();
  });

  it('debería abrir modal en modo edición', () => {
    const productoMock = { _id: '123', nombre: 'Test' } as any;
    component.abrirEdicion(productoMock);
    expect(component.modalVisible).toBeTrue();
    expect(component.productoSeleccionado).toEqual(productoMock);
  });

  it('debería cerrar modal correctamente', () => {
    component.modalVisible = true;
    component.cerrarModal();
    expect(component.modalVisible).toBeFalse();
  });

  it('debería despachar createProducto al guardar nuevo', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const productoMock = { nombre: 'Nuevo' } as any;
    component.guardarProducto(productoMock);
    expect(dispatchSpy).toHaveBeenCalledWith(createProducto({ producto: productoMock }));
  });

  it('debería despachar updateProducto al guardar existente', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const productoMock = { _id: '123', nombre: 'Editado' } as any;
    component.guardarProducto(productoMock);
    expect(dispatchSpy).toHaveBeenCalledWith(updateProducto({ producto: productoMock }));
  });

  it('debería confirmar eliminación con ConfirmationService', () => {
    const productoMock = { _id: '123', nombre: 'Test Producto' } as any;
    component.confirmarEliminar(productoMock);
    expect(confirmationService.confirm).toHaveBeenCalled();
    expect(confirmationService.confirm).toHaveBeenCalled();
  });
});
