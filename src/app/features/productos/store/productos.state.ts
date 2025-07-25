import { Producto } from '@features/productos/models/producto.model';

export interface ProductosState {
  productos: Producto[];
  loading: boolean;
  error: string | null;
  total: number;
}

export const initialProductosState: ProductosState = {
  productos: [],
  loading: false,
  error: null,
  total: 0
};
