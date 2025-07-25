import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private baseUrl = 'http://localhost:4000/api/productos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: Producto[]; total: number }> {
    return this.http.get<{ data: Producto[]; total: number }>(this.baseUrl);
  }

  getById(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

  getPaginated(limit = 10, offset = 0, nombre?: string, categoria?: string) {
    const params: any = {
      limit,
      offset
    };

    if (nombre) params.nombre = nombre;
    if (categoria) params.categoria = categoria;

    return this.http.get<{ data: Producto[]; total: number }>(this.baseUrl, {
      params
    });
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.baseUrl, producto);
  }

  update(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/${producto._id}`, producto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
