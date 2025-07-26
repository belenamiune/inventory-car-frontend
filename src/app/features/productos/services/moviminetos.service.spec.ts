import { TestBed } from '@angular/core/testing';
import { MovimientosService } from './movimientos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@env/environment';
import { Movimiento } from '@shared/models/movimiento.model';

describe('MovimientosService', () => {
  let service: MovimientosService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.apiUrl}/movimientos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovimientosService]
    });

    service = TestBed.inject(MovimientosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /movimientos/:productoId and return movimientos', () => {
    const productoId = 'abc123';
    const mockResponse: Movimiento[] = [
      { productoId: '1', tipo: 'entrada', cantidad: 10, fecha: '2024-01-01' },
      { productoId: '2', tipo: 'salida', cantidad: 5, fecha: '2024-01-02' }
    ];

    service.getByProductoId(productoId).subscribe(movimientos => {
      expect(movimientos).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/${productoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
