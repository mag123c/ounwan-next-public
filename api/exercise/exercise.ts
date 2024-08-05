import { Server500Alert, common500Alert } from "@/components/common/sweetalert/500.alert";
import { IWorkoutRecord } from "@/components/workout/components/slide/today-add-workout";
import { IExerciseInfo } from "@/interfaces/exercise.interface";
import { getAccessToken } from "@/service/token.service";
import { extractToYmd } from "@/utils/date.util";
import axios from "axios";

export const addWorkoutAPI = async (formData: FormData) => {
    try {
        const response = await axios(`${process.env.NEXT_PUBLIC_NEST_URL}/exercise`, {
            method: 'POST',
            data: formData,
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        })
        return response;
    }
    catch (e: any) {
        console.error(e);
        if (e.statusCode === 500) {
            common500Alert('등록 실패');
        }
    }
}

export const getTargetList = async (accessToken: string) => {
    const url = `${process.env.NEXT_PUBLIC_NEST_URL}/target`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true,
    });
    return response.data;
}

export const getExerciseList = async (accessToken: string) => {
    const url = `${process.env.NEXT_PUBLIC_NEST_URL}/exercise`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true,
    });
    return response.data;
}

export const changeFavorite = async (exerciseNo: number) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) throw new Error('accessToken이 없습니다.');

        const url = `${process.env.NEXT_PUBLIC_NEST_URL}/exercise/favorite/${exerciseNo}`;
        const response = await axios.put(url, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true,
        });
        return response.data;
    }
    catch (e: any) {
        if (e.message === 'accessToken이 없습니다.') {
            return {
                statusCode: 401,
                message: 'accessToken이 없습니다.'
            }
        }
    }

}

export const recordDoneExerciseAPI = async (recordDetail: IWorkoutRecord[], date?: Date) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) throw new Error('accessToken이 없습니다.');

        const dateParam = extractToYmd(date);

        const url = `${process.env.NEXT_PUBLIC_NEST_URL}/exercise/${dateParam}`;
        const response = await axios.post(url, { recordDetail }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true,
        });
        return response.data;
    }
    catch (e: any) {
        if (e.message === 'accessToken이 없습니다.') {
            return {
                statusCode: 401,
                message: 'accessToken이 없습니다.'
            }
        }
    }
}

export const deleteUserExerciseAPI = async (userExerciseNo: number, isRow?: boolean) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) throw new Error('accessToken이 없습니다.');

        const url = `${process.env.NEXT_PUBLIC_NEST_URL}/user/exercise/${userExerciseNo}?isRow=${isRow}`;
        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true,
        });
    }
    catch (e: any) {
        throw e;
    }

}


export const getDailyWorkout = async (accessToken?: string, date?: Date) => {
    try {
        const param = date ? extractToYmd(date) : extractToYmd(new Date());
        const token = accessToken ? accessToken : getAccessToken();

        if (!token) throw new Error('accessToken이 없습니다.');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEST_URL}/user/exercise/${param}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        });
        return response.data;
    }
    catch (e: any) {
        if (e.message === 'accessToken이 없습니다.') {
            return {
                statusCode: 401,
                message: 'accessToken이 없습니다.'
            }
        }
    }
}

export const getWholeWorkout = async (accessToken: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_NEST_URL}/user/exercises`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true,
        });
        return response.data;
    }
    catch (e) {

    }
}

export const deleteExerciseRowAPI = async (exercise: IExerciseInfo) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_NEST_URL}/exercise/${exercise.no}`, {
            data: {
                exercise: exercise
            },
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
        return response.data;
    }
    catch (e: any) {
        if (e.response?.data?.status === 500) {
            common500Alert('운동 삭제 실패');
            return;
        }
        else {
            Server500Alert();
        }
    }
}

export const putExerciseRowAPI = async (updatedExerciseData: FormData, no: number) => {
    try {
        console.log(updatedExerciseData);
        const response = await axios(`${process.env.NEXT_PUBLIC_NEST_URL}/exercise/${no}`, {
            method: 'PUT',
            data: updatedExerciseData,
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
        return response.data;
    }
    catch (e: any) {
        if (e.response?.data?.status === 500) {
            common500Alert('운동 수정 실패');
            return;
        }
        else {
            Server500Alert();
        }
    }
};