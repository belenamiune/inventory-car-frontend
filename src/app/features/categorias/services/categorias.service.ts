import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Categoria } from '@shared/models/categoria.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

private baseUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

 getAll(): Observable<{ data: Categoria[] }> {
  return this.http.get<{ data: Categoria[] }>(this.baseUrl);
}

}
