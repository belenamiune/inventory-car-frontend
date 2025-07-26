import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCategoriasComponent } from '@features/categorias/pages/listado/listado-categorias.component';

describe('ListadoComponent', () => {
  let component: ListadoCategoriasComponent;
  let fixture: ComponentFixture<ListadoCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoCategoriasComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
