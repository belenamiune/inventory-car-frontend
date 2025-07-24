import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './features/auth/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login', 
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
   {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: 'productos', loadChildren: () => import('./features/productos/productos.module').then(m => m.ProductosModule) },
  { path: 'categorias', loadChildren: () => import('./features/categorias/categorias.module').then(m => m.CategoriasModule) },
  {
    path: 'registro', component: RegisterComponent},
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
