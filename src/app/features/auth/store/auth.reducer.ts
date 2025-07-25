import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, AuthActions.register, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { token, email }) => ({
    ...state,
    user: email,
    token,
    loading: false,
    error: null
  })),

  on(AuthActions.registerSuccess, state => ({
    ...state,
    loading: false,
    error: null
  })),

  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AuthActions.logout, () => initialAuthState)
);
