
export type TUser = {
    user: IUserInfo;
    body: IBodyInfo[];
    recent: IBodyRecent;    
}
export interface IUserInfoProps {
    user: IUserInfo;
    test?: any;
}

export interface IUserInfo {
    no: number;
    userId: string;
    nikcname: string;
    sex: number;
    year: number;
    height: number;
    weight: number;
    snsType: number;
    snsNo: number;
    createdAt: Date;
    updatedAt: Date;
    lastWorkout: Date;
    lastLogined: Date;
    role?: string;
}



export interface IBodyInfo {
    no: number;
    userNo: number;
    height: number;
    weight: number | null;
    fat: number | null;
    muscleMass: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBodyRecent {
    height: number;
    weight: number;
    fat: number;
    muscleMass: number;
}
export interface IBodyInfoProps {
    body: IBodyInfo[];
}