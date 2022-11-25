import { DraggableLocation } from "react-beautiful-dnd";
import { IMoveResult, ITask } from "../types";

export const moveTask = (source: ITask[], destination: ITask[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation): IMoveResult | any => {
    const sourceClone = [...source];
    const destClone = [...destination];
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: IMoveResult = {
        oldStage: null,
        newStage: null,
    };
    result[droppableSource.droppableId as keyof typeof result] = sourceClone;
    result[droppableDestination.droppableId as keyof typeof result] = destClone;

    return result;
};