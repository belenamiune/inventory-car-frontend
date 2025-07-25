import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movimiento } from 'src/app/shared/models/movimiento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private baseUrl = 'http://localhost:4000/api/movimientos';

  constructor(private http: HttpClient) {}

  getByProductoId(productoId: string): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(`${this.baseUrl}/${productoId}`);
  }
}
