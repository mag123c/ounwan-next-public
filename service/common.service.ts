import { getUserInfo } from "@/api/user/user";
import { IUserInfo } from "@/interfaces/user.interface";
import { GetServerSidePropsContext } from "next/types";
import { removeAllTokensSSP } from "./token.service";

export const initialize = (ctx: GetServerSidePropsContext) => {
    removeAllTokensSSP(ctx);
    return {
        redirect: {
            destination: `${process.env.NEXT_PUBLIC_NEXT_URL}/signin`,
            permanent: false,
        }
    }
}

export const initUserInfo = async (accessToken: string, ctx: GetServerSidePropsContext): Promise<IUserInfo> => {
    return await getUserInfo(accessToken)
        .then(res => res)
        .catch((e) => {
            throw e;
        });
}