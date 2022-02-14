import AsyncStorage from '@react-native-community/async-storage';
import { AppThunk } from '../interfaces/redux.interface';
import { IToggleIsLoading, Theme } from './interfaces';
import { SET_THEME, TOGGLE_IS_LOADING } from './types';

export const toggleIsLoading = (isLoading: IToggleIsLoading['isLoading']) => ({ type: TOGGLE_IS_LOADING, isLoading });

export const setTheme = (theme: Theme) => ({ type: SET_THEME, theme });

export const toggleTheme = (theme: Theme): AppThunk => {
  return (dispatch) => {
    AsyncStorage.setItem('theme', theme)
      .then(() => dispatch(setTheme(theme)))
      .catch((error) => console.log('ERROR -> toggleTheme AsyncStorage: ', error));
  };
};
