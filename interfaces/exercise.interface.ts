export interface IExerciseInfo {
    no: number;
    name: string;
    targets: string[];
    path: string;
    selectCnt: number;
    favoriteCnt: number;
    favorite: boolean;
}

export interface ITargetInfo {
    name: string[];
}

export interface IWorkout {
    exerciseNo: number;
    userExerciseNo: number;
    exerciseName: string;
    sets?: TSet[];
    time?: number;
    memo?: string;
    createdAt?: Date;
    url: string;
}

type TSet = {
    reps?: number;
    weight?: number;
}

export interface IWholeWorkout {
    date: string;
    workout: IWorkout[];
}