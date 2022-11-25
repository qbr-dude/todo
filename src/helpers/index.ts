import { DraggableLocation } from "react-beautiful-dnd";
import { IMoveResult, ITask } from "../types/types";

export const moveTask = (source: ITask[], destination: ITask[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation): IMoveResult | any => {
    const sourceClone = [...source];
    const destClone = [...destination];
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: IMoveResult = {};
    result['oldStageList'] = sourceClone;
    result['newStageList'] = destClone;
    result['oldStateName'] = droppableSource.droppableId;
    result['newStateName'] = droppableDestination.droppableId;

    return result;
};

export const reorder = (list: ITask[], startIndex: number, endIndex: number): ITask[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}