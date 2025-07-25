import { TestBed } from '@angular/core/testing';

import { CategoriasService } from '@features/categorias/services/categorias.service';

describe('CategoriasService', () => {
  let service: CategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
