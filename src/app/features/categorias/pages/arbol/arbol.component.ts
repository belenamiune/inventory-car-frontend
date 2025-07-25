import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Categoria } from 'src/app/shared/models/categoria.model';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-arbol',
  templateUrl: './arbol.component.html'
})
export class ArbolComponent implements OnInit {
  categoriasTree: TreeNode[] = [];
  selectedNode: TreeNode | null = null;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.categoriasService.getAll().subscribe(categorias => {
      this.categoriasTree = this.convertirPlanoATree(categorias);
    });
  }

  convertirPlanoATree(categorias: Categoria[]): TreeNode[] {
    const map = new Map<string, TreeNode>();
    const tree: TreeNode[] = [];

    categorias.forEach(cat => {
      map.set(cat._id, {
        label: cat.nombre,
        key: cat._id,
        children: [],
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder'
      });
    });

    categorias.forEach(cat => {
      const nodo = map.get(cat._id)!;
      if (cat.padre) {
        const padre = map.get(cat?.padre);
        padre?.children?.push(nodo);
      } else {
        tree.push(nodo);
      }
    });

    return tree;
  }
}
