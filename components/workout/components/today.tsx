import AdminPopup from "@/components/common/popup/admin-popup";
import { IExerciseInfo, ITargetInfo, IWorkout } from "@/interfaces/exercise.interface";
import { IUserInfo } from "@/interfaces/user.interface";
import { extractToYmd2 } from "@/utils/date.util";
import { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import TodayWorkOutList from "./data/today-list";
import AdminAddWorkOutSlide from "./slide/admin/add-workout";
import AdminModifyWorkOutSlide from "./slide/admin/modify-workout";
import ModifySlide from "./slide/modify-workout";
import TodayAddWorkOutSlide from "./slide/today-add-workout";

export interface IWorkOutSlideProps {
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
}

export interface IExerciseListProps {
    exercise: IExerciseInfo[];
}

export interface ITodayWorkoutProps {
    user: IUserInfo;
    target: ITargetInfo;
    exercise: IExerciseInfo[];
    dailyWorkout: IWorkout[];
    selectedDate: Date;
}

export default function TodayWorkout({ user, target, exercise, dailyWorkout, selectedDate }: ITodayWorkoutProps) {

    const [isAdminPopup, setIsAdminPopup] = useState<boolean>(false);
    const [isAddDataSlideVisible, setIsAddDataSlideVisible] = useState<boolean>(false);
    const [isModifyDataSlideVisible, setIsModifyDataSlideVisible] = useState<boolean>(false);
    const [isWorkOutSlideVisible, setIsWorkoutSlideVisible] = useState<boolean>(false);
    const [isRoutineSlidevisible, setIsRoutineSlideVisible] = useState<boolean>(false);
    const [isModifySlideVisible, setIsModifySlideVisible] = useState<boolean>(false);

    const targetName = Object.assign(target).map((t: any) => t.name);

    return (
        <TodayWorkOutContainer>
            <TodayWorkOutTitle>
                <Title>{extractToYmd2(selectedDate)}</Title>
                {user.role && user.role === 'admin' &&
                    <AddWorkOutDataBtn variant="outline-light" onClick={() => setIsAdminPopup(!isAdminPopup)}>
                        관리자모드
                    </AddWorkOutDataBtn>
                }
                {user.role && user.role === 'admin' && isAdminPopup &&
                    <AdminPopup
                        isAdminPopup={isAdminPopup}
                        setIsAdminPopup={setIsAdminPopup}
                        isAddDataSlideVisible={isAddDataSlideVisible}
                        setIsAddDataSlideVisible={setIsAddDataSlideVisible}
                        isModifyDataSlideVisible={isModifyDataSlideVisible}
                        setIsModifyDataSlideVisible={setIsModifyDataSlideVisible}
                    />
                }
            </TodayWorkOutTitle>
            {dailyWorkout.length > 0 ? (<TodayWorkOutList dailyWorkout={dailyWorkout} />) : null}
            <TodayWorkOutBtnContainer>
                <AddWorkOutBtn variant="outline-danger" onClick={() => setIsWorkoutSlideVisible(!isWorkOutSlideVisible)}>
                    +운동추가
                </AddWorkOutBtn>
                {dailyWorkout.length > 0 && <ModifyWorkOutBtn variant="outline-warning" onClick={() => setIsModifySlideVisible(!isModifySlideVisible)}>
                    수정하기
                </ModifyWorkOutBtn>}
                {/* <RoutineLoadBtn variant="outline-warning" onClick={() => setIsRoutineSlideVisible(!isRoutineSlidevisible)}>
                    루틴불러오기
                </RoutineLoadBtn> */}
            </TodayWorkOutBtnContainer>
            {user.role && user.role === 'admin' && isAddDataSlideVisible &&
                <AdminAddWorkOutSlide
                    user={user}
                    targetName={targetName}
                    isVisible={isAddDataSlideVisible}
                    setIsVisible={setIsAddDataSlideVisible}
                />
            }
            {user.role && user.role === 'admin' && isModifyDataSlideVisible &&
                <AdminModifyWorkOutSlide
                    target={targetName}
                    exercise={exercise}
                    isVisible={isModifyDataSlideVisible}
                    setIsVisible={setIsAddDataSlideVisible}
                    selectedDate={selectedDate}
                />
            }
            {isWorkOutSlideVisible && <TodayAddWorkOutSlide target={targetName} exercise={exercise} isVisible={isWorkOutSlideVisible} setIsVisible={setIsWorkoutSlideVisible} selectedDate={selectedDate} />}
            {/* {isRoutineSlidevisible && <RoutineLoadSlide isVisible={isRoutineSlidevisible} setIsVisible={setIsRoutineSlideVisible} />} */}
            {isModifySlideVisible && <ModifySlide isVisible={isModifySlideVisible} setIsVisible={setIsModifySlideVisible} modifyWorkout={dailyWorkout} selectedDate={selectedDate} />}
        </TodayWorkOutContainer>
    )
}

const TodayWorkOutContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;    
    align-items: center;

`

const TodayWorkOutTitle = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    position: relative;
`

const TodayWorkOutBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.h3`
    margin: 1.5rem;
    @media (max-width: 576px) {
        margin: 1rem;
    }
    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
    @media (max-width: 375px) {
        font-size: 1rem;
    }
    @media (max-width: 280px) {
        font-size: 0.8rem;
    }
`

const AddWorkOutDataBtn = styled(Button)`
    position: absolute;
    right: 2%;
    width: 100px;
    height: 40px;
    font-size: 1rem;
    @media (max-width: 576px) {
        width: 80px;
        height: 30px;    
        font-size: 0.7rem !important;            
    }
    @media (max-width: 375px) {
        width: 60px;
        height: 25px;    
        font-size: 0.5rem !important; 
    }
`


const AddWorkOutBtn = styled(Button)`
    width: 250px;
    height: 50px;
    margin: 1rem;    
    @media (max-width: 576px) {
        width: 100px;
        height: 30px;    
        font-size: 0.75rem !important;            
    }
    @media (max-width: 375px) {
        width: 80px;
        height: 25px;    
        font-size: 0.6rem !important; 
        margin: 0.7rem;    
    }
`

const RoutineLoadBtn = styled(Button)`
    width: 250px;
    height: 50px;
    margin: 1rem;
    font-size: 1.3rem;
    @media (max-width: 576px) {
        width: 100px;
        height: 30px;    
        font-size: 0.75rem !important;            
    }
    @media (max-width: 375px) {
        width: 80px;
        height: 25px;    
        font-size: 0.6rem !important; 
        margin: 0.7rem;    
    }
`

const ModifyWorkOutBtn = styled(Button)`
    width: 250px;
    height: 50px;
    margin: 1rem;
    font-size: 1.3rem;
    @media (max-width: 576px) {
        width: 100px;
        height: 30px;    
        font-size: 0.75rem !important;            
    }
    @media (max-width: 375px) {
        width: 80px;
        height: 25px;    
        font-size: 0.6rem !important; 
        margin: 0.7rem;    
    }
`