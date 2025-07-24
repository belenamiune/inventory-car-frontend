import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../../../shared/models/categoria.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private baseUrl = 'http://localhost:4000/api/categorias';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Categoria[]> {
  return this.http.get<{ data: Categoria[] }>(`${this.baseUrl}`).pipe(
    map((res) => res.data)
  );
}
}
