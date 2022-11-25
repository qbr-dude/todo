export interface ITask {
    id: string;
    name: string;
}

export interface IMoveResult {
    oldStage: ITask[] | null;
    newStage: ITask[] | null;
}