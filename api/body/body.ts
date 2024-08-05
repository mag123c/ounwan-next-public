import { IBodyInfo } from "@/interfaces/user.interface";
import { getAccessToken } from "@/service/token.service";
import axios from "axios";

export const getBodyInfo = async (accessToken: string, period?: string) => {
    const query = period ? `?period=${period}` : `?period=전체기간`;
    const url = `${process.env.NEXT_PUBLIC_NEST_URL}/body${query}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true,
    });
    return response.data;
}

export const saveBodyInfo = async (date: string, weight: number, muscleMass: number, fat: number) => {
    try {
        const accessToken = getAccessToken();
        const requestDto = {
            createdAt: date,
            weight,
            muscleMass,
            fat
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_NEST_URL}/body`,
            requestDto,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        if (response.data.status === 201) {
            return response.data;
        }
    }
    catch (e: any) {
        console.error(e);
        return null;
    }

}

export const putMyBodyInfoAPI = async (body: IBodyInfo) => {
    try {
        const accessToken = getAccessToken();
        const response = await axios.put(`${process.env.NEXT_PUBLIC_NEST_URL}/body/${body.no}`,
            body,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,

            }
        );

        return response.data;
    }
    catch (e: any) {
        console.error(e);
    }
}

export const deleteMyBodyInfoAPI = async (myBodyNo: number) => {
    try {
        const accessToken = getAccessToken();
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_NEST_URL}/body/${myBodyNo}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,

            }
        );
        return response.data;
    }
    catch (e: any) {
        console.error(e);
    }
}