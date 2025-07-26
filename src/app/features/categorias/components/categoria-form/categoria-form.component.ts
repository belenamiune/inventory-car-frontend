import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria } from '@shared/models/categoria.model';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent implements OnChanges {
  @Input() visible = false;
  @Input() categoria: Categoria | null = null;
  @Input() categorias: Categoria[] = [];

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Categoria>();

  form = this.fb.group({
    nombre: ['', Validators.required],
    padre: [null]
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoria'] && this.categoria) {
      this.form.patchValue({
        ...this.categoria,
        padre: this.categoria.padre?._id || this.categoria.padre || null
      });
    } else if (!this.visible) {
      this.form.reset();
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.guardar.emit({
      ...(this.categoria?._id ? { _id: this.categoria._id } : {}),
      ...this.form.value
    } as Categoria);
  }

  onHide() {
    this.cerrar.emit();
  }
}
