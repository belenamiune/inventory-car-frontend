import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { login, selectAuthLoading, selectAuthError } from '@features/auth/store';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  error$: Observable<string | null> = this.store.select(selectAuthError);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    const credentials = {
      email: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || ''
    };
    this.store.dispatch(login({ credentials }));
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}
