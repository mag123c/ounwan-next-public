import BaseComponents from "@/components/base/base";
import Workout from "@/components/workout/workout";
import { IExerciseInfo, ITargetInfo, IWholeWorkout, IWorkout } from "@/interfaces/exercise.interface";
import { IUserInfo } from "@/interfaces/user.interface";
import { workoutSSR } from "@/service/login/page/workout/workout.service";
import { AppContainer } from "@/styles/appContainer";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export interface IWorkoutProps {
    user: IUserInfo;
    target: ITargetInfo;
    exercise: IExerciseInfo[];
    dailyWorkout: IWorkout[];
    wholeWorkout: IWholeWorkout[];
}

function WorkingOut({ user, target, exercise, dailyWorkout, wholeWorkout }: IWorkoutProps) {

    return (
        <>
            <AppContainer>
                <Workout user={user} target={target} exercise={exercise} dailyWorkout={dailyWorkout} wholeWorkout={wholeWorkout}/>
                <BaseComponents title={""} description={""} image={""} url={""} role={user.role as string} />
            </AppContainer>
        </>
    )
}

export default WorkingOut;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    return await workoutSSR(ctx);
}