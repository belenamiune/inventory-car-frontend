import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../../store/auth/auth.selector';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  error$: Observable<string | null> = this.store.select(selectAuthError);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    });

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {}

  onSubmit() {
    if (this.registerForm.invalid) return;

    const credentials = {
        email: this.registerForm.get('email')?.value || '',
        password: this.registerForm.get('password')?.value || '',
    };
    this.store.dispatch(register({ credentials }));
  }

    irALogin() {
        this.router.navigate(['auth/login']);
    }
}
