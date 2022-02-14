import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import rootReducer from '../reducers';
import store from '../store';

export type AppDispatch = ReturnType<typeof store.dispatch>;
export type RootState = ReturnType<typeof rootReducer>;
export type TDispatch = Dispatch<AppDispatch>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
