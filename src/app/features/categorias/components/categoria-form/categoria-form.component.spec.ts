import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaFormComponent } from './categoria-form.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Categoria } from '@shared/models/categoria.model';
import { Component, forwardRef } from '@angular/core';

describe('CategoriaFormComponent', () => {
  let component: CategoriaFormComponent;
  let fixture: ComponentFixture<CategoriaFormComponent>;
  @Component({
    selector: 'p-dropdown',
    template: '',
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MockDropdownComponent),
        multi: true
      }
    ]
  })
  class MockDropdownComponent implements ControlValueAccessor {
    writeValue() {}
    registerOnChange() {}
    registerOnTouched() {}
    setDisabledState?() {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaFormComponent, MockDropdownComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should patch form with categoria when categoria changes', () => {
      const mockCategoria: Categoria = {
        _id: '1',
        nombre: 'Lubricantes',
        padre: { _id: '2', nombre: 'Padre' }
      };

      component.categoria = mockCategoria;
      component.ngOnChanges({
        categoria: {
          currentValue: mockCategoria,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(component.form.value).toEqual({
        nombre: 'Lubricantes',
        padre: '2' as any
      });
    });

    it('should reset form when visible is false and no categoria', () => {
      component.form.patchValue({ nombre: 'Algo', padre: 'x' as any });

      component.visible = false;
      component.categoria = null;
      component.ngOnChanges({
        visible: {
          currentValue: false,
          previousValue: true,
          firstChange: false,
          isFirstChange: () => false
        }
      });

      expect(component.form.value).toEqual({ nombre: null, padre: null });
    });
  });

  describe('onSubmit', () => {
    it('should not emit guardar if form is invalid', () => {
      spyOn(component.guardar, 'emit');
      component.onSubmit();
      expect(component.guardar.emit).not.toHaveBeenCalled();
    });

    it('should emit guardar if form is valid', () => {
      const categoria = { nombre: 'Repuestos', padre: null };
      component.form.setValue(categoria);
      spyOn(component.guardar, 'emit');

      component.onSubmit();

      expect(component.guardar.emit).toHaveBeenCalledWith(jasmine.objectContaining(categoria));
    });

    it('should include _id when editing', () => {
      component.categoria = { _id: '123', nombre: 'Editando' };
      component.form.setValue({ nombre: 'Editado', padre: null });
      spyOn(component.guardar, 'emit');

      component.onSubmit();

      expect(component.guardar.emit).toHaveBeenCalledWith({
        _id: '123',
        nombre: 'Editado',
        padre: null
      });
    });
  });

  it('should emit cerrar on onHide', () => {
    spyOn(component.cerrar, 'emit');
    component.onHide();
    expect(component.cerrar.emit).toHaveBeenCalled();
  });
});
