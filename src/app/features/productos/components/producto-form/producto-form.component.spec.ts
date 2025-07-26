import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ProductoFormComponent } from './producto-form.component';
import { Categoria } from '@shared/models/categoria.model';
import { Producto } from '@features/productos/models/producto.model';
import { Component } from '@angular/core';

describe('ProductoFormComponent', () => {
  let component: ProductoFormComponent;
  let fixture: ComponentFixture<ProductoFormComponent>;

  @Component({
    selector: 'p-multiSelect',
    template: '',
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: DummyMultiSelectComponent,
        multi: true
      }
    ]
  })
  class DummyMultiSelectComponent {
    writeValue() {}
    registerOnChange() {}
    registerOnTouched() {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoFormComponent, DummyMultiSelectComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should patch form when producto is provided', () => {
      const mockCategoria: Categoria = {
        _id: 'cat1',
        nombre: 'Filtros'
      };

      const producto: Producto = {
        _id: '1',
        nombre: 'Aceite',
        precio: 1500,
        stock: 50,
        imagenUrl: 'http://test.com/imagen.png',
        categorias: [mockCategoria]
      };

      component.producto = producto;
      component.ngOnChanges({
        producto: {
          currentValue: producto,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(component.form.value).toEqual({
        nombre: 'Aceite',
        precio: 1500 as any,
        stock: 50 as any,
        imagenUrl: 'http://test.com/imagen.png',
        categorias: [mockCategoria]
      });
    });

    it('should reset form when visible is false and producto is null', () => {
      component.form.patchValue({
        nombre: 'Temporal',
        precio: 100 as any,
        stock: 2 as any,
        imagenUrl: 'x',
        categorias: ['x' as any]
      });

      component.visible = false;
      component.producto = null;

      component.ngOnChanges({
        visible: {
          currentValue: false,
          previousValue: true,
          firstChange: false,
          isFirstChange: () => false
        }
      });

      expect(component.form.value).toEqual({
        nombre: null,
        precio: null,
        stock: null,
        imagenUrl: null,
        categorias: null
      });
    });
  });

  describe('onSubmit', () => {
    it('should NOT emit if form is invalid', () => {
      spyOn(component.guardar, 'emit');
      component.onSubmit();
      expect(component.guardar.emit).not.toHaveBeenCalled();
    });

    it('should emit producto when form is valid (crear)', () => {
      spyOn(component.guardar, 'emit');

      component.form.setValue({
        nombre: 'Lubricante',
        precio: 2000 as any,
        stock: 30 as any,
        imagenUrl: '',
        categorias: []
      });

      component.onSubmit();

      expect(component.guardar.emit).toHaveBeenCalled();
    });

    it('should emit producto with _id when editing', () => {
      spyOn(component.guardar, 'emit');

      component.producto = {
        _id: '1',
        nombre: 'Original',
        precio: 1500,
        stock: 20,
        imagenUrl: '',
        categorias: []
      };

      component.form.setValue({
        nombre: 'Actualizado',
        precio: 1800 as any,
        stock: 10 as any,
        imagenUrl: '',
        categorias: []
      });

      component.onSubmit();

      expect(component.guardar.emit).toHaveBeenCalledWith({
        _id: '1',
        nombre: 'Actualizado',
        precio: 1800,
        stock: 10,
        imagenUrl: '',
        categorias: []
      });
    });
  });

  it('should emit cerrar on onHide', () => {
    spyOn(component.cerrar, 'emit');
    component.onHide();
    expect(component.cerrar.emit).toHaveBeenCalled();
  });
});
