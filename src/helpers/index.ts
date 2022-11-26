import { DraggableLocation } from "react-beautiful-dnd";
import { IMoveResult, ITask } from "../types/types";
import { formatDistance } from 'date-fns';

export const moveTask = (source: ITask[], destination: ITask[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation): IMoveResult | any => {
    const sourceClone = [...source];
    const destClone = [...destination];
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    removed.currentStatus = droppableDestination.droppableId;
    removed.id = `${droppableDestination.droppableId}-${getFreeListID(destClone)}`

    destClone.splice(droppableDestination.index, 0, removed);

    const result: IMoveResult = {};
    result['oldStageList'] = sourceClone;
    result['newStageList'] = destClone;
    result['oldStateName'] = droppableSource.droppableId;
    result['newStateName'] = droppableDestination.droppableId;

    return result;
};

/**
 * Перестановка задачи внутри списка
 * @param list 
 * @param startIndex 
 * @param endIndex 
 * @returns 
 */
export const reorder = (list: ITask[], startIndex: number, endIndex: number): ITask[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export function capitalize(str: string) {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Получение свободного индекса. Для этого используется перебор индексов в массиве. Пропущенный индекс возращается, иначе выдается новый.
 * @param {ITask} list 
 * @returns new index
 */
export const getFreeListID = (list: ITask[]): number => {
    if (list.length === 0)
        return 0;

    const sorted = list.sort((a, b) => getNumberFromID(a.id) - getNumberFromID(b.id));

    if (getNumberFromID(sorted[0].id) !== 0) {
        return 0;
    }

    for (var i = 1; i < sorted.length; i++) {
        if (getNumberFromID(sorted[i].id) - getNumberFromID(sorted[i - 1].id) != 1) {
            return getNumberFromID(sorted[i - 1].id) + 1;
        }
    }
    return sorted.length;
}

/**
 * Получение числа из строкового индекса
 * @param {string} id 
 * @returns 
 */
const getNumberFromID = (id: string): number => {
    return parseInt(id.split('-')[1]);
}

/**
 * Разница времени. Написана для избежания ошибок при отсутствии знайчений параметров
 * @param oldDate 
 * @param currentDate 
 * @returns 
 */
export const calculateTime = (oldDate: Date | number, currentDate: Date | number): string => {
    if (!oldDate || !currentDate)
        return '';

    const difference = formatDistance(currentDate, oldDate, { includeSeconds: true });

    return difference;
}