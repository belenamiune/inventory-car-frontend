import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria } from '@shared/models/categoria.model';
import { Producto } from '@features/productos/models/producto.model';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html'
})
export class ProductoFormComponent implements OnChanges {
  @Input() visible = false;
  @Input() categorias: Categoria[] = [];
  @Input() producto: Producto | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Producto>();

  form = this.fb.group({
    nombre: ['', Validators.required],
    precio: [null, [Validators.required, Validators.min(0)]],
    stock: [null, [Validators.required, Validators.min(0)]],
    imagenUrl: [''],
    categorias: [[] as Categoria[]]
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && this.producto) {
      this.form.patchValue(this.producto as any);
    } else if (!this.visible) {
      this.form.reset();
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.guardar.emit({
      ...(this.producto?._id ? { _id: this.producto._id } : {}),
      ...this.form.value
    } as unknown as Producto);
  }

  onHide() {
    this.cerrar.emit();
  }
}
