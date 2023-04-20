import {configureStore} from '@reduxjs/toolkit';
import thunk, {ThunkDispatch} from 'redux-thunk';
import rootReducer, {RootState} from './rootReducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(thunk);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, any>;
export type AppStore = Omit<typeof store, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};

export default store;
