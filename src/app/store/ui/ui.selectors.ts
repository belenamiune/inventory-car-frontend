import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from './ui.reducer';

export const selectUIState = createFeatureSelector<UIState>('ui');

export const selectTheme = createSelector(
  selectUIState,
  (state) => state.theme
);
