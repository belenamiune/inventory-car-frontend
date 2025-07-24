import { Categoria } from "src/app/shared/models/categoria.model";

export interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  stock: number;
  imagenUrl?: string;
  categorias?: Categoria[]; 
}
