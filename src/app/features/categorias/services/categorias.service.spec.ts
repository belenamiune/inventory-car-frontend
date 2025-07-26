import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriasService } from './categorias.service';
import { environment } from '@env/environment';
import { Categoria } from '@shared/models/categoria.model';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.apiUrl}/categorias`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriasService]
    });

    service = TestBed.inject(CategoriasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /categorias', () => {
    const mockResponse = {
      data: [{ _id: '1', nombre: 'Lubricantes' }],
      total: 1
    };

    service.getAll().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call POST /categorias/', () => {
    const mockCategoria: Categoria = { _id: '1', nombre: 'Repuestos' };

    service.create(mockCategoria).subscribe(res => {
      expect(res).toEqual(mockCategoria);
    });

    const req = httpMock.expectOne(`${baseUrl}/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCategoria);
    req.flush(mockCategoria);
  });

  it('should call PUT /categorias/:id', () => {
    const categoriaActualizada: Categoria = { _id: '1', nombre: 'Filtros' };

    service.update(categoriaActualizada).subscribe(res => {
      expect(res).toEqual(categoriaActualizada);
    });

    const req = httpMock.expectOne(`${baseUrl}1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(categoriaActualizada);
    req.flush(categoriaActualizada);
  });

  it('should call DELETE /categorias/:id', () => {
    const id = '1';

    service.delete(id).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });
});
