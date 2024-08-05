import { IWorkout } from "@/interfaces/exercise.interface";
import Image from 'next/image';
import styled from "styled-components";

interface ITodayWorkoutProps {
    dailyWorkout: IWorkout[];
}

export default function TodayWorkOutList({ dailyWorkout }: ITodayWorkoutProps) {

    return (
        <TodayWorkOutContainer>
            {dailyWorkout.map((item, index) => (
                <WorkoutRow key={index}>
                    <ExerciseImg
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.url}`}
                        width={180}
                        height={120}
                        alt={item.url.split('.')[0]}
                    />
                    <WorkoutData>
                        <WorkoutTitle>
                            <Title>{item.exerciseName}</Title>
                        </WorkoutTitle>
                        <WorkoutSet>
                            {item.sets?.map((set, index) => (
                                <WorkoutSetDetail key={`set-${index}`}>
                                    <SetData>
                                        {set.weight && set.weight > 0 ? (
                                            <Weight>{set.weight}</Weight>
                                        ) : null}
                                        {set.reps && set.reps > 0 ? (
                                            <Reps $isWeightNull={!set.weight || set.weight <= 0}>
                                                {set.reps && set.reps}x
                                            </Reps>
                                        ) : null}
                                    </SetData>
                                </WorkoutSetDetail>
                            ))}
                            {item.time && item.time > 0 ? (
                                <WorkoutSetDetail>
                                    <SetData>
                                        {item.time && item.time > 0 ? (
                                            <Time>{item.time}x</Time>
                                        ) : null}
                                    </SetData>
                                </WorkoutSetDetail>
                            ) : null}
                        </WorkoutSet>
                    </WorkoutData>
                </WorkoutRow>
            ))}
        </TodayWorkOutContainer>
    )
}

const TodayWorkOutContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const WorkoutRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: var(--bs-gray-900);
    border-radius: 20px;
    padding: 1rem;
    margin: 0.5rem 0;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
`
const ExerciseImg = styled(Image)`   
    width: 150px;
    height: 100px;
    margin: 0;
    object-fit: cover;
    object-position: center right;
    padding-left: 0.5rem;
    margin-left: -2%;
    flex-shrink: 0;
    @media (max-width: 576px) {
        width: 120px;
        height: 80px;    
    }
    @media (max-width: 430px) {
        width: 95px;
        height: 60px;   
    }
    @media (max-width: 375px) {
        width: 60px;
        height: 40px;   
    }
`

const WorkoutData = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
`

const WorkoutTitle = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Title = styled.h4`
    width: auto;
    font-size: 1.2rem;
    color: var(--bs-light);

    @media (max-width: 576px) {
        font-size: 1.1rem;
    }
    @media (max-width: 430px) {
        font-size: 1rem;
    }
    @media (max-width: 375px) {
        font-size: 0.9rem;
    }
    @media (max-width: 280px) {
        font-size: 0.8rem;    
    }
`

const WorkoutSet = styled.div`
    display: flex;
    align-items: center;
`

const WorkoutSetDetail = styled.div`
    text-align: center;
    display: flex;
`

const SetData = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 0.5rem;
`

const Weight = styled.div`
    font-size: 1rem;
    padding: 0.2rem;
    background-color: #664d03;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 576px) {
        font-size: 1rem;
    }
    @media (max-width: 430px) {
        font-size: 0.8rem;
        width: 2rem;
        height: 2rem;
    }
    @media (max-width: 375px) {
        font-size: 0.7rem;
        width: 1.5rem;
        height: 1.5rem;
    }    
    @media (max-width: 280px) {
        font-size: 0.6rem;
        width: 1.2rem;
        height: 1.2rem;
    }
`
const Reps = styled.div<{ $isWeightNull: boolean }>`
    font-size: 1rem;
    padding: 0.2rem;
    text-align: center;

    background-color: transparent;
    @media (max-width: 576px) {
        font-size: 1rem;
    }
    @media (max-width: 430px) {
        font-size: 0.8rem;
    }
    @media (max-width: 375px) {
        font-size: 0.7rem;
    }    
    @media (max-width: 280px) {
        font-size: 0.6rem;
    }

    ${({ $isWeightNull }) => $isWeightNull ? `
        font-size: 1rem;
        padding: 0.2rem;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #4f0111;
        border-radius: 50%;
        color: white;
        @media (max-width: 576px) {
            font-size: 1rem;
        }
        @media (max-width: 430px) {
            font-size: 0.8rem;
            width: 2rem;
            height: 2rem;
        }
        @media (max-width: 375px) {
            font-size: 0.7rem;
            width: 1.5rem;
            height: 1.5rem;
        }    
        @media (max-width: 280px) {
            font-size: 0.6rem;
            width: 1.2rem;
            height: 1.2rem;
        }
    ` : `
    `}
`
const Time = styled.div`
    font-size: 1rem;
    padding: 0.2rem;
    background-color: #4f0111;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 576px) {
        font-size: 1rem;
    }
    @media (max-width: 430px) {
        font-size: 0.8rem;
        width: 2rem;
        height: 2rem;
    }
    @media (max-width: 375px) {
        font-size: 0.7rem;
        width: 1.5rem;
        height: 1.5rem;
    }    
    @media (max-width: 280px) {
        font-size: 0.6rem;
        width: 1.2rem;
        height: 1.2rem;
    }
`