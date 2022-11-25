import { createStore } from 'redux';
import stateListsReducer from './stateListsReducer';

export const store = createStore(stateListsReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;