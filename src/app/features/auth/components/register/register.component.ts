import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../../store/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  error$: Observable<string | null> = this.store.select(selectAuthError);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    const credentials = {
        email: this.loginForm.get('email')?.value || '',
        password: this.loginForm.get('password')?.value || '',
    };
    this.store.dispatch(register({ credentials }));
  }
}
