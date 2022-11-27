import { IAction, IProject } from "../types/types";

export const ProjectActions = {
    ADD_PROJECT: 'ADD_PROJECT',
    INCREMENT_COUNTER: 'INCREMENT_COUNTER',
    INIT_PROJECTS: 'INIT_PROJECTS',
    CLEAR_PROJECTS: 'CLEAR_PROJECTS'
}

const initProjectState: IProject[] = [];

export const projectReducer = (state = initProjectState, action: IAction): IProject[] => {
    switch (action.type) {
        case ProjectActions.ADD_PROJECT:
            return [...state, action.payload];
        case ProjectActions.INCREMENT_COUNTER:
            // Обновление счетчика у проекта (с расчетом, что не нужно удалять задачи)
            const newArray = [...state];
            const index = newArray.findIndex(proj => proj.id === action.payload);
            newArray[index].tasksCount += 1;
            return newArray;
        case ProjectActions.INIT_PROJECTS:
            return [...action.payload];

        default:
            return state;
    }
}