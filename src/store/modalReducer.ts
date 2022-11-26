import { IAction, IModalView } from "../types/types"

const initModalView: IModalView = {
    status: 'hidden'
}

export const ModalViewActions = {
    CHANGE_STATUS: 'CHANGE_STATUS',
    CHANGE_FULL: 'CHANGE_FULL',
}

export const modalReducer = (state = initModalView, action: IAction): IModalView => {
    switch (action.type) {
        // попробовать добавить сворачивание
        case ModalViewActions.CHANGE_STATUS:
            return { ...state, status: action.payload };
        case ModalViewActions.CHANGE_FULL:
            return { ...action.payload };

        default:
            return state;
    }
}