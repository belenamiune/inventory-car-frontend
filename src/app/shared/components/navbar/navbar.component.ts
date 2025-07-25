import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/auth/auth.actions';
import { toggleTheme } from 'src/app/store/ui/ui.actions';
import { selectTheme } from 'src/app/store/ui/ui.selectors';

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
    { path: '', label: 'Categorías' }
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
