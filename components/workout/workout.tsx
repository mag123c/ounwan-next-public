import { getDailyWorkout } from "@/api/exercise/exercise";
import { IWorkout } from "@/interfaces/exercise.interface";
import { IWorkoutProps } from "@/pages/workout";
import router from "next/router";
import { useState } from "react";
import styled from "styled-components";
import PastWorkOut from "./components/past";
import TodayWorkout from "./components/today";

export default function Workout({ user, target, exercise, dailyWorkout, wholeWorkout }: IWorkoutProps) {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedDayWorkout, setSelectedDayWorkout] = useState<IWorkout[]>(dailyWorkout);

    const handleClickDay = async (value: Date) => {
        try {
            const data = await getDailyWorkout(undefined, value);

            if (data.statusCode === 401) {
                router.push('/signin');
            }
            else {
                if (Array.isArray(data) && data.length > 0) {
                    setSelectedDayWorkout([...data]);
                }
                else {
                    setSelectedDayWorkout([]);
                }

                setSelectedDate(value);
            }
        } catch (e) {
            console.error('Error fetching workout:', e);
        }
    };

    return (
        <WorkOutContainer>
            <TodayWorkout user={user} target={target} exercise={exercise} dailyWorkout={selectedDayWorkout} selectedDate={selectedDate} />
            <PastWorkOut dailyWorkout={selectedDayWorkout} wholeWorkout={wholeWorkout} setSelectedDay={handleClickDay} />
        </WorkOutContainer>
    )
}

const WorkOutContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`