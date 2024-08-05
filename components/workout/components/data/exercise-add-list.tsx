import { changeFavorite } from "@/api/exercise/exercise";
import { common500Alert } from "@/components/common/sweetalert/500.alert";
import { IExerciseInfo } from "@/interfaces/exercise.interface";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

interface IExerciseListProps {
    exercise: IExerciseInfo[];
    selectedNo: number[];
    onRecordButtonClick: () => void;
    onSelectedInit: () => void;
    onSelectedExercise: (exerciseNo: number, exerciseName: string, exerciseTargets: string[]) => void;
}

export default function ExerciseList({ exercise, selectedNo, onRecordButtonClick, onSelectedInit, onSelectedExercise }: IExerciseListProps) {

    const [exerciseList, setExerciseList] = useState<IExerciseInfo[]>(exercise);

    useEffect(() => {
        setExerciseList(exercise);
    }, [exercise])

    const router = useRouter();

    const handleFavorite = async (e: MouseEvent<HTMLImageElement>, exerciseNo: number) => {
        e.stopPropagation();
        
        const response = await changeFavorite(exerciseNo);
        if (response.statusCode === 401) {
            common500Alert('로그인이 필요합니다.');
            router.push('/login');
            return;
        }
        if (response.status === 200 || response.status === 201) {
            const updatedExercises = exerciseList.map(item => {
                if (item.no === exerciseNo) {
                    return { ...item, favorite: !item.favorite };
                }
                return item;
            });
            setExerciseList(updatedExercises);
        }
    }

    return (
        <>
            <ExerciseListContainer>
                {exerciseList.map((item, index) => (
                    <ExerciseItem
                        key={index}
                        onClick={() => onSelectedExercise(item.no, item.name, item.targets)}
                        $isLast={index === exerciseList.length - 1}
                    >
                        {selectedNo.includes(item.no) && (
                            <CheckIcon
                                src="/icon/btn/check.png"
                                alt="check"
                                width={15}
                                height={15}
                            />
                        )}
                        <ExerciseImg
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.path}`}
                            width={250}
                            height={180}
                            alt={item.name.split('.')[0]}
                        />
                        <ExerciseText>
                            <ExerciseName>{item.name}</ExerciseName>
                            <ExerciseTarget>{item.targets}</ExerciseTarget>
                        </ExerciseText>
                        <FavoriteBtn>
                            <Favorite
                                src={item.favorite ? '/icon/btn/fullstar.png' : '/icon/btn/fullstar.svg'}
                                alt="favorite"
                                width={15}
                                height={15}
                                onClick={(e) => handleFavorite(e, item.no)}
                            />
                        </FavoriteBtn>
                    </ExerciseItem>
                ))
                }
            </ExerciseListContainer >
            {selectedNo.length > 0 && (
                <BtnContainer>
                    <AddBtn variant='danger' onClick={onRecordButtonClick}>
                        기록추가
                    </AddBtn>
                    <InitBtn variant='warning' onClick={onSelectedInit}>
                        초기화
                    </InitBtn>
                </BtnContainer>
            )}
        </>
    )
}

const ExerciseListContainer = styled.div`
    width: 100%;
    height: calc(100vh - 170px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    margin-top: 5%;

    /* Firefox */
    scrollbar-width: none;
    /* IE, Edge, Chrome, Safari */
    &::-webkit-scrollbar {
        display: none;
    }
    z-index: 10;
`

const ExerciseItem = styled.div<{ $isLast: boolean }>`
    width: 100%;    
    display: flex;    
    align-items: center;
    justify-content: space-around;
    margin-bottom: ${props => props.$isLast ? '20%' : '10%'};
    cursor: pointer;
    position: relative;
`

const ExerciseImg = styled(Image)`
    object-fit: cover;
    object-position: center;
    padding-left: 0.5rem;
    margin-left: -1%;
    flex-shrink: 0;   
    @media (max-width: 576px) {
        width: 180px;
        height: 120px;    
    }
    @media (max-width: 375px) {
        width: 120px;
        height: 100px;    
    }
    @media (max-width: 280px) {
        width: 100px;
        height: 75px;    
    }
`

const CheckIcon = styled(Image)`   
    position: absolute;
    top: 50%;
    left: 4%;
`

const FavoriteBtn = styled.div`
    margin-right: 10px;
`

const Favorite = styled(Image)`   
    cursor: pointer;
`

const ExerciseText = styled.div`
    display: flex;
    min-width: 40%;
    flex-direction: column;
    justify-content: center;
`
const ExerciseName = styled.span`    
    @media (max-width: 375px) {
        font-size: 0.8rem !important;
    }
`

const ExerciseTarget = styled.span`
    color: var(--bs-gray-500);
    @media (max-width: 375px) {
        font-size: 0.6rem !important;
    }
`

const BtnContainer = styled.div`
    position: fixed;
    bottom: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    width: auto;  
    z-index: 100;
`;

const AddBtn = styled(Button)`
    margin-right: 10px;
    padding: 10px 40px !important;
    @media (max-width: 576px) {
        font-size: 0.9rem !important;
        padding: 10px 30px !important;
    }
    @media (max-width: 430px) {        
        font-size: 0.8rem !important;
        padding: 10px 20px !important;
    }
    @media (max-width: 280px) {
        font-size: 0.7rem !important;
        padding: 10px !important;
    }
`

const InitBtn = styled(Button)`
    margin-left: 10px;
    padding: 10px 40px !important;
    @media (max-width: 576px) {
        font-size: 0.9rem !important;
        padding: 10px 20px !important;
    }
    @media (max-width: 430px) {        
        font-size: 0.8rem !important;
        padding: 10px !important;
    }
    @media (max-width: 280px) {
        font-size: 0.7rem !important;
        padding: 10px !important;
    }
`

const WorkoutRecordContainer = styled.div`

`