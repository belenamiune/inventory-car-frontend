import { createReducer, on } from '@ngrx/store';
import * as ThemeActions from '@store/theme';

export interface ThemeState {
  theme: 'light' | 'dark';
}

export const initialState: ThemeState = {
  theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
};

export const themeReducer = createReducer(
  initialState,
  on(
    ThemeActions.setLightTheme,
    (state: ThemeState): ThemeState => ({
      ...state,
      theme: 'light'
    })
  ),
  on(
    ThemeActions.setDarkTheme,
    (state: ThemeState): ThemeState => ({
      ...state,
      theme: 'dark'
    })
  ),
  on(
    ThemeActions.toggleTheme,
    (state: ThemeState): ThemeState => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light'
    })
  )
);
