import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';

/**
 * The Redux store configuration.
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares => middlewares().concat([logger]),
});

/**
 * The type for the dispatch function used in thunk actions.
 */
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, any>;

/**
 * The application store type, which includes the dispatch function.
 */
export type AppStore = Omit<typeof store, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};

export default store;
