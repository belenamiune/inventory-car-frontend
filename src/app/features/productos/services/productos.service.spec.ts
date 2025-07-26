import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductosService } from './productos.service';
import { Producto } from '@features/productos/models/producto.model';

describe('ProductosService', () => {
  let service: ProductosService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:4000/api/productos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductosService]
    });

    service = TestBed.inject(ProductosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all productos', () => {
    const mockResponse = {
      data: [
        {
          _id: '1',
          nombre: 'Aceite',
          precio: 1000,
          stock: 25,
          categoria: 'cat123',
          descripcion: 'Aceite sintético'
        }
      ],
      total: 1
    };

    service.getAll().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get producto by id', () => {
    const mockProducto: Producto = { _id: '1', nombre: 'Filtro', precio: 2000, stock: 20 };

    service.getById('1').subscribe(res => {
      expect(res).toEqual(mockProducto);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducto);
  });

  it('should get paginated productos with filters', () => {
    const mockResponse = {
      data: [
        {
          _id: '1',
          nombre: 'Aceite',
          precio: 1000,
          stock: 25,
          categoria: 'cat123',
          descripcion: 'Aceite sintético'
        }
      ],
      total: 1
    };

    service.getPaginated(10, 0, 'Lubi', '123').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      r =>
        r.url === baseUrl &&
        r.params.get('limit') === '10' &&
        r.params.get('offset') === '0' &&
        r.params.get('nombre') === 'Lubi' &&
        r.params.get('categoria') === '123'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a producto', () => {
    const mockProducto: Producto = {
      _id: '1',
      nombre: 'Nuevo Producto',
      precio: 0,
      stock: 0
    };

    service.create(mockProducto).subscribe(res => {
      expect(res).toEqual(mockProducto);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProducto);
    req.flush(mockProducto);
  });

  it('should update a producto', () => {
    const mockProducto: Producto = {
      _id: '1',
      nombre: 'Actualizado',
      precio: 0,
      stock: 0
    };

    service.update(mockProducto).subscribe(res => {
      expect(res).toEqual(mockProducto);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProducto);
    req.flush(mockProducto);
  });

  it('should delete a producto by id', () => {
    service.delete('1').subscribe(res => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
