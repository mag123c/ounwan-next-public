import { getUserInfo, validateRefreshToken } from "@/api/user/user";
import { IUserInfo } from "@/interfaces/user.interface";
import { initUserInfo, initialize } from "@/service/common.service";
import { GetServerSidePropsContext } from "next";
import { removeAllTokensSSP, renewAllTokensSSP } from "../../../token.service";

export const mainSSR = async (ctx: GetServerSidePropsContext) => {
    const accessToken = ctx?.req?.headers?.cookie?.split("access_token=")[1]?.split(";")[0];
    const refreshToken = ctx?.req?.headers?.cookie?.split("refresh_token=")[1]?.split(";")[0];

    try {
        if (accessToken) {
            const userInfo: IUserInfo = await initUserInfo(accessToken, ctx);

            return {
                props: {
                    user: userInfo,
                }
            }
        }

        if (!accessToken && refreshToken) {

            const token = await validateRefreshToken(refreshToken);
            if (token) {

                const userInfo: IUserInfo = await getUserInfo(token.accessToken);

                renewAllTokensSSP(ctx, token.accessToken, token.refreshToken);

                return {
                    props: {
                        user: userInfo,
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

            return initialize(ctx);
            
        }
    }

}