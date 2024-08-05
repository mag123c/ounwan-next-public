import { getDailyWorkout, getExerciseList, getTargetList, getWholeWorkout } from "@/api/exercise/exercise";
import { getUserInfo, validateRefreshToken } from "@/api/user/user";
import { IUserInfo } from "@/interfaces/user.interface";
import { GetServerSidePropsContext } from "next";
import { removeAllTokensSSP, renewAllTokensSSP } from "../../../token.service";

export const workoutSSR = async (ctx: GetServerSidePropsContext) => {
    try {
        const accessToken = ctx?.req?.headers?.cookie?.split("access_token=")[1]?.split(";")[0];
        const refreshToken = ctx?.req?.headers?.cookie?.split("refresh_token=")[1]?.split(";")[0];

        if (accessToken) {
            const userInfo: IUserInfo = await getUserInfo(accessToken);
            const targetInfo = (await getTargetList(accessToken)).data;
            const exerciseInfo = await getExerciseList(accessToken);
            const dailyWorkout = await getDailyWorkout(accessToken);
            const wholeWorkout = await getWholeWorkout(accessToken);

            return {
                props: {
                    user: userInfo,
                    target: targetInfo,
                    exercise: exerciseInfo,
                    dailyWorkout: dailyWorkout,
                    wholeWorkout: wholeWorkout,
                }
            }
        }

        if (!accessToken && refreshToken) {

            const token = await validateRefreshToken(refreshToken);
            if (token) {
                const userInfo: IUserInfo = await getUserInfo(token.accessToken);
                const targetInfo = await getTargetList(token.accessToken);
                const exerciseInfo = await getExerciseList(token.accessToken);
                const dailyWorkout = await getDailyWorkout(token.accessToken);
                const wholeWorkout = await getWholeWorkout(token.accessToken);

                renewAllTokensSSP(ctx, token.accessToken, token.refreshToken);

                return {
                    props: {
                        user: userInfo,
                        target: targetInfo,
                        exercise: exerciseInfo,
                        dailyWorkout: dailyWorkout,
                        wholeWorkout: wholeWorkout,
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