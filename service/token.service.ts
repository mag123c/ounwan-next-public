import { GetServerSidePropsContext } from "next";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const setAccessToken = (accessToken: string) => {
    cookies.set('access_token', accessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 604800000,
    });
};

export const setRefreshToken = (refreshToken: string) => {
    cookies.set('refresh_token', refreshToken, {
        path: '/',
        httpOnly: true,
        maxAge: 604800000 * 4,
    });
};

export const removeTokens = () => {    
    cookies.remove('access_token');
    cookies.remove('refresh_token');
};

export const haveAccessToken = (): boolean => {
    return !!cookies.get('access_token');
};

export const getAccessToken = (): string => {    
    return cookies.get('access_token');
};

export const getRefreshToken = (): string => {
    return cookies.get('refresh_token');
};

export const renewAllTokensSSP = async (ctx: GetServerSidePropsContext, accessToken: string, refreshToken: string) => {
    ctx.res.setHeader('Set-Cookie', [
        `access_token=${accessToken}; Path=/; domain=ounwan.net; SameSite=Strict`,
        `refresh_token=${refreshToken}; Path=/; domain=ounwan.net; HttpOnly; SameSite=Strict`
    ]);
};

export const removeAllTokensSSP = async (ctx: GetServerSidePropsContext) => {
    ctx.res.setHeader('Set-Cookie', [
        `access_token=; Path=/; domain=${process.env.NODE_ENV == 'production' ? 'ounwan.net' : 'localhost'}; SameSite=Strict; Max-Age=0`,
        `refresh_token=; Path=/; domain=${process.env.NODE_ENV == 'production' ? 'ounwan.net' : 'localhost'}; HttpOnly; SameSite=Strict; Max-Age=0`
    ]);
};