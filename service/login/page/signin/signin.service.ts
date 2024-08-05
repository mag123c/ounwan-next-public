import { validateRefreshToken } from "@/api/user/user";
import { removeAllTokensSSP, renewAllTokensSSP } from "@/service/token.service";
import { GetServerSidePropsContext } from "next";

export const signinSSR = async (ctx: GetServerSidePropsContext) => {
    const accessToken = ctx?.req?.headers?.cookie?.split("access_token=")[1]?.split(";")[0];
    const refreshToken = ctx?.req?.headers?.cookie?.split("refresh_token=")[1]?.split(";")[0];

    if (accessToken) {
        return {
            redirect: {
                destination: `${process.env.NEXT_PUBLIC_NEXT_URL}/main`,
                permanent: false,
            }
        };
    }

    if (!accessToken && refreshToken) {
        const token = await validateRefreshToken(refreshToken);
        if (token) {
            renewAllTokensSSP(ctx, token.accessToken, token.refreshToken);
            return {
                redirect: {
                    destination: `${process.env.NEXT_PUBLIC_NEXT_URL}/main`,
                    permanent: false,
                }
            };
        } else {
            removeAllTokensSSP(ctx);
            return {
                props: {
                    isLogined: false,
                }
            };
        }
    }

    return {
        props: {
            isLogined: false,
        }
    };
};
