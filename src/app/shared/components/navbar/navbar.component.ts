import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '@features/auth/store';
import { toggleTheme, selectTheme } from '@store/theme';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  theme$ = this.store.select(selectTheme);
  mobileMenuOpen = false;

  routes = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/productos', label: 'Productos' },
    { path: '/', label: 'Categorías' } // sin implementar
  ];

  constructor(
    private store: Store,
    private router: Router
  ) {}

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/auth/login']);
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }
}
