import { createAction } from '@ngrx/store';

export const setLightTheme = createAction('[UI] Set Light Theme');
export const setDarkTheme = createAction('[UI] Set Dark Theme');
export const toggleTheme = createAction('[UI] Toggle Theme');
