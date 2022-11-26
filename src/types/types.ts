export interface ITask {
    id: string;
    heading: string;
    description?: string;
    createDate?: Date;
    workingHours?: Date;
    endDate?: Date;
    priority?: string;
    currentStatus?: string;
    comments?: ITaskComment[];
}

export interface ITaskComment {
    id: number;
    taskID: string;
    text: string;
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

export interface IAction {
    type: string;
    payload: any;
}

export interface IClickHandler {
    (value?: any): void | undefined;
}

export interface ICallback {
    (): void;
}

export interface IModalView {
    status: string;
    taskID?: string;
    stateID?: string;
}