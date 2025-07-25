import { createAction } from '@ngrx/store';

export const setLightTheme = createAction('[Theme] Set Light Theme');
export const setDarkTheme = createAction('[Theme] Set Dark Theme');
export const toggleTheme = createAction('[Theme] Toggle Theme');
