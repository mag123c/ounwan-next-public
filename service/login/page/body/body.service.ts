import { getBodyInfo } from "@/api/body/body";
import { getUserInfo, validateRefreshToken } from "@/api/user/user";
import { IUserInfo } from "@/interfaces/user.interface";
import { GetServerSidePropsContext } from "next";
import { removeAllTokensSSP, renewAllTokensSSP } from "../../../token.service";

export const bodySSR = async (ctx: GetServerSidePropsContext) => {
    try {
        const accessToken = ctx?.req?.headers?.cookie?.split("access_token=")[1]?.split(";")[0];
        const refreshToken = ctx?.req?.headers?.cookie?.split("refresh_token=")[1]?.split(";")[0];

        if (accessToken) {
            const userInfo: IUserInfo = await getUserInfo(accessToken);
            const userBodyInfo = await getBodyInfo(accessToken);
            const { bodyInfos, recentInfo } = userBodyInfo;

            return {
                props: {
                    user: userInfo,
                    body: bodyInfos,
                    recent: recentInfo,
                }
            }
        }

        if (!accessToken && refreshToken) {

            const token = await validateRefreshToken(refreshToken);
            if (token) {

                const userInfo: IUserInfo = await getUserInfo(token.accessToken);
                const userBodyInfo = await getBodyInfo(token.accessToken);

                renewAllTokensSSP(ctx, token.accessToken, token.refreshToken);

                return {
                    props: {
                        user: userInfo,
                        body: userBodyInfo,
                    }
                }
            }

            else {

                removeAllTokensSSP(ctx);

                return {
                    redirect: {
                        destination: `${process.env.NEXT_PUBLIC_NEXT_URL}/signin`,
                        permanent: false,
                    }
                }

            }
        }

        else {
            return {
                redirect: {
                    destination: `${process.env.NEXT_PUBLIC_NEXT_URL}/signin`,
                    permanent: false,
                }
            }
        }
    }
    catch (e: any) {

        if (e.response?.data?.errorCode === 401100) {
            removeAllTokensSSP(ctx);
        }
        return {
            redirect: {
                destination: `${process.env.NEXT_PUBLIC_NEXT_URL}/signin`,
                permanent: false,
            }
        }        

    }

}