import { GeneralActionTypes, IGeneralState } from './interfaces';
import { SET_THEME, TOGGLE_IS_LOADING } from './types';

const initialState: IGeneralState = {
  isLoading: false,
  theme: undefined,
};

const general = (state = initialState, action: GeneralActionTypes) => {
  switch (action.type) {
    case TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default general;
