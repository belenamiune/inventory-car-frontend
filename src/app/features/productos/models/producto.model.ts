export interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  stock: number;
  imagenUrl?: string;
  categorias?: string[]; 
}
