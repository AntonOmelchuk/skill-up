import { SET_THEME, TOGGLE_IS_LOADING } from './types';

export enum Theme {
  light = 'light',
  dark = 'dark',
}

type IsLoading = boolean;

export interface IGeneralState {
  isLoading: IsLoading,
  theme: Record<Theme, string> | undefined
}

export interface IToggleIsLoading {
  type: typeof TOGGLE_IS_LOADING
  isLoading: IsLoading
}

export interface ISetTheme {
  type: typeof SET_THEME
  theme: Theme
}

export type GeneralActionTypes = IToggleIsLoading
| ISetTheme;
