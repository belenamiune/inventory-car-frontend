import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArbolComponent } from './arbol.component';
import { CategoriasService } from '@features/categorias/services/categorias.service';
import { of } from 'rxjs';
import { Categoria } from '@shared/models/categoria.model';

describe('ArbolComponent', () => {
  let component: ArbolComponent;
  let fixture: ComponentFixture<ArbolComponent>;
  let mockCategoriasService: jasmine.SpyObj<CategoriasService>;

  beforeEach(async () => {
    mockCategoriasService = jasmine.createSpyObj('CategoriasService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [ArbolComponent],
      providers: [
        { provide: CategoriasService, useValue: mockCategoriasService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArbolComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAll and set categoriasTree on ngOnInit', () => {
    const mockCategorias: Categoria[] = [
      { _id: '1', nombre: 'Padre' },
      { _id: '2', nombre: 'Hijo', padre: '1' },
    ];

    mockCategoriasService.getAll.and.returnValue(of({ data: mockCategorias, total: 2 }));

    fixture.detectChanges();

    expect(mockCategoriasService.getAll).toHaveBeenCalled();
    expect(component.categoriasTree.length).toBe(1);
    expect(component.categoriasTree[0].children?.length).toBe(1);
    expect(component.categoriasTree[0].label).toBe('Padre');
    expect(component.categoriasTree[0].children?.[0].label).toBe('Hijo');
  });

  it('should convert flat array to tree correctly', () => {
    const flat: Categoria[] = [
      { _id: '1', nombre: 'Root' },
      { _id: '2', nombre: 'Child', padre: '1' },
      { _id: '3', nombre: 'Another Root' }
    ];

    const tree = component.convertirPlanoATree(flat);

    expect(tree.length).toBe(2);
    expect(tree[0].label).toBe('Root');
    expect(tree[0].children?.[0].label).toBe('Child');
    expect(tree[1].label).toBe('Another Root');
  });
});
