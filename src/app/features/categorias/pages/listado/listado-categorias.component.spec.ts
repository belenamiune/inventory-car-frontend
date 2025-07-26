import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoCategoriasComponent } from './listado-categorias.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ConfirmationService } from 'primeng/api';
import { Categoria } from '@shared/models/categoria.model';
import {
  loadPaginatedCategorias,
  deleteCategoria,
  updateCategoria,
  createCategoria
} from '@features/categorias/store/categorias.actions';

describe('ListadoCategoriasComponent', () => {
  let component: ListadoCategoriasComponent;
  let fixture: ComponentFixture<ListadoCategoriasComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;

  beforeEach(async () => {
    confirmationService = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    await TestBed.configureTestingModule({
      declarations: [ListadoCategoriasComponent],
      providers: [
        provideMockStore(),
        { provide: ConfirmationService, useValue: confirmationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoCategoriasComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPaginatedCategorias on ngOnInit', () => {
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      loadPaginatedCategorias({
        limit: component.rows,
        offset: 0,
        nombre: undefined,
        padre: undefined
      })
    );
  });

  it('should dispatch loadPaginatedCategorias on onBuscar', () => {
    component.nombre = 'Aceite';
    component.padre = '1';
    component.onBuscar();
    expect(dispatchSpy).toHaveBeenCalledWith(
      loadPaginatedCategorias({
        limit: component.rows,
        offset: 0,
        nombre: 'Aceite',
        padre: '1'
      })
    );
  });

  it('should reset filters and reload on resetFiltros', () => {
    component.nombre = 'Lubricantes';
    component.padre = 'X';
    component.resetFiltros();
    expect(component.nombre).toBe('');
    expect(component.padre).toBe('');
    expect(dispatchSpy).toHaveBeenCalledWith(
      loadPaginatedCategorias({
        limit: component.rows,
        offset: 0,
        nombre: undefined,
        padre: undefined
      })
    );
  });

  it('should load correct page on onPageChange', () => {
    component.onPageChange({ first: 20 });
    expect(dispatchSpy).toHaveBeenCalledWith(
      loadPaginatedCategorias({
        limit: component.rows,
        offset: 20,
        nombre: undefined,
        padre: undefined
      })
    );
  });

  it('should open new modal on abrirNuevo', () => {
    component.abrirNuevo();
    expect(component.categoriaSeleccionada).toBeNull();
    expect(component.modalVisible).toBeTrue();
  });

  it('should set selected category and open modal on abrirEdicion', () => {
    const categoria: Categoria = { _id: '1', nombre: 'Filtros' };
    component.abrirEdicion(categoria);
    expect(component.categoriaSeleccionada).toEqual(categoria);
    expect(component.modalVisible).toBeTrue();
  });

  it('should close modal on cerrarModal', () => {
    component.modalVisible = true;
    component.cerrarModal();
    expect(component.modalVisible).toBeFalse();
  });

  it('should call confirmationService on confirmarEliminar', () => {
    const categoria: Categoria = { _id: '123', nombre: 'Repuestos' };
    component.confirmarEliminar(categoria);
    expect(confirmationService.confirm).toHaveBeenCalled();
  });

  it('should dispatch updateCategoria if categoria has _id', () => {
    const categoria: Categoria = { _id: '1', nombre: 'Aceites' };
    component.guardarCategoria(categoria);
    expect(dispatchSpy).toHaveBeenCalledWith(updateCategoria({ categoria }));
    expect(component.modalVisible).toBeFalse();
  });

  it('should dispatch createCategoria if categoria has no _id', () => {
    const categoria: Categoria = {
        nombre: 'Nueva',
        _id: ''
    };
    component.guardarCategoria(categoria);
    expect(dispatchSpy).toHaveBeenCalledWith(createCategoria({ categoria }));
    expect(component.modalVisible).toBeFalse();
  });
});
