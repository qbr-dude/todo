export interface ITask {
    id: string;
    name: string;
}

export interface ITaskStateLists {
    queue: ITask[];
    development: ITask[];
    done: ITask[];
}

export interface IMoveResult {
    oldStageList?: ITask[];
    newStageList?: ITask[];
    oldStateName?: string;
    newStateName?: string;
}

export interface ITaskClickHandler {
    (taskID: string): any;
}

export interface IAction {
    type: string;
    payload: any;
}