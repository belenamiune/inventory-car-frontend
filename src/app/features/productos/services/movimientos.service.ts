import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movimiento } from '@shared/models/movimiento.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  
  private baseUrl = `${environment.apiUrl}/productos`;    

  constructor(private http: HttpClient) {}

  getByProductoId(productoId: string): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(`${this.baseUrl}/${productoId}`);
  }
}
