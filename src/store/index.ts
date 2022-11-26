import { combineReducers, createStore } from 'redux';
import { modalReducer } from './modalReducer';
import stateListsReducer from './stateListsReducer';

const rootReducer = combineReducers({
    stateListsR: stateListsReducer,
    modalR: modalReducer,
})

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;