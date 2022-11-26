import { IAction, IProject } from "../types/types";

export const ProjectActions = {
    ADD_PROJECT: 'ADD_PROJECT',
    INIT_PROJECTS: 'INIT_PROJECTS',
    CLEAR_PROJECTS: 'CLEAR_PROJECTS'
}

const initProjectState: IProject[] = [];

export const projectReducer = (state = initProjectState, action: IAction): IProject[] => {
    switch (action.type) {
        case ProjectActions.ADD_PROJECT:
            return [...state, action.payload];
        case ProjectActions.INIT_PROJECTS:
            return [...action.payload];

        default:
            return state;
    }
}