import { deleteUserExerciseAPI, recordDoneExerciseAPI } from "@/api/exercise/exercise";
import { Overlay } from "@/components/common/overlay/overlay";
import { common500Alert } from "@/components/common/sweetalert/500.alert";
import { IWorkout } from "@/interfaces/exercise.interface";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { IWorkOutSlideProps } from "../today";
import { IStrengthSet, IWorkoutRecord } from "./today-add-workout";

interface IModifySlideProps extends IWorkOutSlideProps {
    modifyWorkout: IWorkout[];
    selectedDate: Date;
}

export default function ModifySlide({ isVisible, setIsVisible, modifyWorkout, selectedDate }: IModifySlideProps) {

    const [slideIn, setSlideIn] = useState<boolean>(isVisible);
    const [overlayVisible, setOverlayVisible] = useState<boolean>(isVisible);
    const [changedWorkoutData, setChangedWorkoutData] = useState<IWorkout[]>(modifyWorkout)

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isVisible) {
            setSlideIn(true);
            inputRef?.current?.focus();
        } else {
            setTimeout(() => setSlideIn(false), 10);
        }
    }, [isVisible]);

    const onClose = () => {
        setChangedWorkoutData(modifyWorkout);
        setSlideIn(false);
        setOverlayVisible(false);
        setTimeout(() => setIsVisible(false), 300);
    }

    const handleAddRow = (index: number) => {
        const updatedDetails = JSON.parse(JSON.stringify(changedWorkoutData));
        const strength = { reps: 0, weight: 0 };
        updatedDetails[index].sets?.push(strength);

        setChangedWorkoutData(updatedDetails);
    };

    const handleDeleteWorkout = async (index: number, exerciseNo?: number) => {

        if (exerciseNo) {
            await deleteUserExerciseAPI(exerciseNo)
                .catch((e: any) => {
                    console.error(e);
                    common500Alert('삭제 실패');
                    return;
                });;
        }

        doAfterDeleteWorkout(index);
    };

    const doAfterDeleteWorkout = (index: number) => {
        const updatedData = [...changedWorkoutData];
        updatedData.splice(index, 1);
        setChangedWorkoutData(updatedData);
    }

    const handleDeleteRow = async (workoutIndex: number, setIndex: number, userExerciseNo: number) => {
        if (!userExerciseNo) return;

        await deleteUserExerciseAPI(userExerciseNo, true)
            .then(() => doAfterDeleteRow(workoutIndex, setIndex))
            .catch((e: any) => {
                console.error(e);
                common500Alert('삭제 실패');
                return;
            });
    };

    const doAfterDeleteRow = (workoutIndex: number, setIndex: number) => {
        const updatedData = JSON.parse(JSON.stringify(changedWorkoutData));
        if (updatedData[workoutIndex].sets) {
            updatedData[workoutIndex].sets?.splice(setIndex, 1);
        }

        if (!updatedData[workoutIndex].sets || updatedData[workoutIndex].sets.length === 0) {
            handleDeleteWorkout(workoutIndex);
        }

        else setChangedWorkoutData(updatedData);
    }

    const handleInputChange = (index: number, setIndex: number, field: keyof IStrengthSet | string, value: any) => {
        const updatedData = [...changedWorkoutData];

        if (index < updatedData.length) {
            if (updatedData[index].time) {
                updatedData[index].time = value;
            }
            else {
                const sets = updatedData[index].sets;
                if (sets && setIndex < sets.length && (field == 'reps' || field == 'weight')) {
                    sets[setIndex][field] = parseFloat(value) || undefined;
                }
            }

            setChangedWorkoutData(updatedData);
        };
    }


    const validateInput = (data: IWorkoutRecord[]): boolean => {
        for (const record of data) {
            if (record.isCardio) {
                if (!record.time || record.time <= 0) {
                    common500Alert("유산소 운동의 시간을 입력해주세요.");
                    return false;
                }
            }
            else {
                if (!record.strengthSets || record.strengthSets.some((set) => (!set.reps || set.reps <= 0))) {
                    common500Alert("근력 운동의 횟수를 입력해주세요.");
                    return false;
                }
            }
        }
        return true;
    };

    const handleWorkOutRecordSubmit = async () => {

        const formedData: IWorkoutRecord[] = changedWorkoutData.map((workout: IWorkout) => {
            const { exerciseNo, exerciseName, sets, time, memo } = workout;

            return {
                exerciseNo,
                exerciseName,
                isCardio: time ? true : false,
                strengthSets: sets as IStrengthSet[],
                time,
                memo,
            }
        })

        if (!validateInput(formedData)) return;

        const response = await recordDoneExerciseAPI(formedData, selectedDate);

        if (response?.status === 201) {
            common500Alert('운동 기록이 성공적으로 등록되었습니다.');
            router.push('/workout');
        } else {
            common500Alert('운동 기록 등록에 실패하였습니다.');
        }
    }

    return (
        <>
            {overlayVisible && <Overlay onClick={onClose} />}
            <SlideContainer $slideIn={slideIn}>
                <SlideTitleContainer>
                    <PrevBtn onClick={onClose}>
                        {'<'}
                    </PrevBtn>
                    <SubmitBtn variant='outline-light' onClick={handleWorkOutRecordSubmit}>
                        수정
                    </SubmitBtn>
                </SlideTitleContainer>
                {changedWorkoutData.map((item, index) => (
                    <WorkOutRecordDetailContainer key={index}>
                        <TitleContainer>
                            <RecordTitle>{item.exerciseName}</RecordTitle>
                            <DeleteWorkoutBtn variant="outline-danger" onClick={() => handleDeleteWorkout(index, item.exerciseNo)}>삭제</DeleteWorkoutBtn>
                        </TitleContainer>
                        {item.time ? (
                            <WorkOutRecordDetail>
                                <thead>
                                    <tr>
                                        <th>시간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={1}>
                                        <td>
                                            <RecordInput
                                                name="time"
                                                type="number"
                                                placeholder="시간(분)"
                                                value={item.time}
                                                onChange={(e) => handleInputChange(index, 1, "time", e.target.value)}
                                            />
                                            분
                                        </td>
                                    </tr>
                                </tbody>
                            </WorkOutRecordDetail>
                        ) : (
                            <WorkOutRecordDetail>
                                <thead>
                                    <tr>
                                        <TableHeader index={1}>세트</TableHeader>
                                        <TableHeader index={2}>횟수</TableHeader>
                                        <TableHeader index={3}>무게</TableHeader>
                                        <TableHeader index={4}></TableHeader>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.sets?.map((set, setIndex) => (
                                        <tr key={setIndex}>
                                            <TableCell index={1}>
                                                <RecordSetsInput
                                                    type="number"
                                                    name='sets'
                                                    placeholder="횟수"
                                                    value={setIndex + 1}
                                                    readOnly={true}
                                                />
                                            </TableCell>
                                            <TableCell index={2}>
                                                <RecordInput
                                                    type="number"
                                                    name='reps'
                                                    placeholder="횟수"
                                                    value={set.reps || ''}
                                                    onChange={(e) => handleInputChange(index, setIndex, "reps", e.target.value)} />
                                                회
                                            </TableCell>
                                            <TableCell index={3}>
                                                <RecordInput
                                                    type="number"
                                                    name='weight'
                                                    placeholder="무게"
                                                    value={set.weight || ''}
                                                    onChange={(e) => handleInputChange(index, setIndex, "weight", e.target.value)}
                                                />
                                                kg
                                            </TableCell>
                                            <TableCell index={4}>
                                                <DeleteRowBtn variant='outline-danger' onClick={() => handleDeleteRow(index, setIndex, item.userExerciseNo)}>X</DeleteRowBtn>
                                            </TableCell>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: 'center' }}>
                                            <AddButton variant='outline-warning' onClick={() => handleAddRow(index)}>+세트추가</AddButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </WorkOutRecordDetail>
                        )}
                        {index < modifyWorkout.length - 1 && <hr style={{ width: '100%' }} />}
                    </WorkOutRecordDetailContainer>
                ))}
            </SlideContainer>
        </>
    )
}


const slideUp = keyframes`
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
`;

const slideDown = keyframes`
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
`;


const SlideContainer = styled.div<{ $slideIn: boolean }>`
    position: fixed;    
    transform: translate(-50%, -50%);    
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: var(--bs-dark);
    z-index: 10;
    opacity: ${({ $slideIn }) => $slideIn ? 1 : 0};
    transition: opacity 0.5s;
    animation: ${({ $slideIn }) => $slideIn ? slideUp : slideDown} 0.5s ease forwards;
`;

const SlideTitleContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;    
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    @media (max-width: 768px) {
        height: 85px;
    }
    @media (max-width: 375px) {
        height: 70px;
    }
`;

const PrevBtn = styled.h2`    
    margin-top: auto;
    cursor: pointer;
    @media (max-width: 576px) {
        font-size: 20px;
    }
    @media (max-width: 375px) {
        font-size: 15px;
        margin-top: 10px;
    }
`;

const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const RecordTitle = styled.span`
    font-size: 1.3rem;
    @media (max-width: 375px) {
        font-size: 1.2rem;   
    }
    @media (max-width: 280px) {
        font-size: 1rem;
    }
`

const WorkOutRecordDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    h3 {
        margin-bottom: 10px;
        margin-left: 20px;
    }    
`

const RecordInput = styled.input`
    width: 60%;
    margin: 0 auto;
    margin-right: 10px;
    text-align: center;
    background-color: var(--bs-gray-700);
    border-radius: 20px;
    color: white;
    font-size: 0.8rem;
    @media (max-width: 280px) {
        font-size: 0.5rem;
    }
    @media (max-width: 375px) {
        font-size: 0.7rem;
    }
`

const RecordSetsInput = styled.input`
    width: 100%;
    background-color: transparent;
    color: var(--bs-danger);
    text-align: center;
    border: none;
    margin: 0 auto;
`

const WorkOutRecordDetail = styled.table`
    width: 80%;
`

const TableHeader = styled.th<{ index: number }>`
    font-size: 0.8rem;
    padding: 10px;
    ${(props) => ((props.index === 1) && `
        width: 15%;
  `)}

    @media (max-width: 280px) {
        font-size: 0.5rem !important;
        ${(props) => ((props.index === 1) && `
            width: 20%;
     `)}
    }
    @media (max-width: 375px) {
        font-size: 0.7rem;
    }

`;

const TableCell = styled.td<{ index: number }>`
    font-size: 0.8rem;
    padding: 10px;
    position: relative;
    ${(props) => ((props.index === 1) && `
        width: 15%;
    `)}

    @media (max-width: 280px) {
        font-size: 0.5rem;
    }
    @media (max-width: 375px) {
        font-size: 0.7rem;
    }
`;


const SubmitBtn = styled(Button)`
    font-size: 1rem !important;
    padding: 5px 20px !important;

    @media (max-width: 375px) {
        font-size: 0.8rem !important;
        padding: 5px 15px !important;
    }
    @media (max-width: 280px) {
        font-size: 0.6rem !important;
        padding: 5px 10px !important;
    }
`

const AddButton = styled(Button)`
    margin-top: 10px;
    font-size: 1rem !important;
    padding: 5px 20px !important;
    @media (max-width: 280px) {
        font-size: 0.7rem !important;
        padding: 5px 10px !important;
    }
    @media (max-width: 375px) {
        font-size: 0.8rem !important;
        padding: 5px 15px !important;
    }
`
const DeleteRowBtn = styled(Button)`
    font-size: 0.8rem !important;
    position: absolute;
    border: none !important;
    right: 1%;
    top: 50%;
    transform: translateY(-50%);
`;

const DeleteWorkoutBtn = styled(Button)`    
    font-size: 0.8rem !important;
    border: none !important;
`;