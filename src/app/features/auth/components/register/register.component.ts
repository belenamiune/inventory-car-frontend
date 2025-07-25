import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { register,  selectAuthLoading, selectAuthError } from '@features/auth/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  error$: Observable<string | null> = this.store.select(selectAuthError);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  onSubmit() {
    if (this.registerForm.invalid) return;

    const credentials = {
      email: this.registerForm.get('email')?.value || '',
      password: this.registerForm.get('password')?.value || ''
    };
    this.store.dispatch(register({ credentials }));
  }

  irALogin() {
    this.router.navigate(['auth/login']);
  }
}
