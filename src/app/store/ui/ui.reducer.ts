import { createReducer, on } from '@ngrx/store';
import * as UIActions from './ui.actions';

export interface UIState {
  theme: 'light' | 'dark';
}

export const initialState: UIState = {
  theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
};

export const uiReducer = createReducer(
  initialState,
  on(
    UIActions.setLightTheme,
    (state: UIState): UIState => ({
      ...state,
      theme: 'light'
    })
  ),
  on(
    UIActions.setDarkTheme,
    (state: UIState): UIState => ({
      ...state,
      theme: 'dark'
    })
  ),
  on(
    UIActions.toggleTheme,
    (state: UIState): UIState => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light'
    })
  )
);
