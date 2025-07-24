import { createAction, props } from '@ngrx/store';
import { LoginPayload, RegisterPayload } from '../../../app/features/auth/models/auth.model';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginPayload }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; email: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ credentials: RegisterPayload }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success'
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
