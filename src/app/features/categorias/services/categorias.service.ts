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

    getAll(params?: any) {
    const queryParams: any = {};

    return this.http.get<{ data: Categoria[]; total: number }>(`${this.baseUrl}`, {
        params: queryParams
    });
    }


    create(categoria: Categoria) {
    return this.http.post<Categoria>(`${this.baseUrl}/`, categoria);
    }

    update(categoria: Categoria) {
    return this.http.put<Categoria>(`${this.baseUrl}${categoria._id}`, categoria);
    }

    delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
    }

}
