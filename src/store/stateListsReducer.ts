import { IAction, ITaskStateLists } from "../types/types"

export const StateListsActions = {
    UPDATE_QUEUE: 'UPDATE_QUEUE',
    UPDATE_DEVELOPMENT: 'UPDATE_DEVELOPMENT',
    UPDATE_DONE: 'UPDATE_DONE',
    UPDATE_FULL_STATE: 'UPDATE_FULL_STATE',
    CLEAR_STATE: 'CLEAR_STATE',
}

const initStateLists: ITaskStateLists = {
    queue: [],
    development: [],
    done: [],
}

const stateListsReducer = (state = initStateLists, action: IAction): ITaskStateLists => {
    switch (action.type) {
        case StateListsActions.UPDATE_QUEUE:
            return { ...state, queue: action.payload };
        case StateListsActions.UPDATE_DEVELOPMENT:
            return { ...state, development: action.payload };
        case StateListsActions.UPDATE_DONE:
            return { ...state, done: action.payload };
        case StateListsActions.UPDATE_FULL_STATE:
            return { ...action.payload };
        case StateListsActions.CLEAR_STATE:
            return initStateLists;


        default:
            return state;
    }
}

export default stateListsReducer;