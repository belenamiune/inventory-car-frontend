import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { PrivateLayoutComponent } from '@layouts/private-layout/private-layout.component';
import { PublicLayoutComponent } from '@layouts/public-layout/public-layout.component';
import { DetalleComponent } from '@features/productos/pages/detalle/detalle.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('./features/productos/productos.module').then(m => m.ProductosModule)
      },
      {
        path: 'productos/:id',
        component: DetalleComponent
      },
      {
        path: 'categorias',
        loadChildren: () =>
          import('./features/categorias/categorias.module').then(m => m.CategoriasModule)
      }
    ]
  },

  {
    path: 'auth',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
