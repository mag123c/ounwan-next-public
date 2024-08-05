import { recordDoneExerciseAPI } from "@/api/exercise/exercise";
import { Overlay } from "@/components/common/overlay/overlay";
import { common500Alert } from "@/components/common/sweetalert/500.alert";
import { commonDoneAlert } from "@/components/common/sweetalert/component.alert";
import SlideQueryList from "@/components/slide/slide-query";
import useDebounce from "@/hooks/useDebounce";
import { IExerciseInfo } from "@/interfaces/exercise.interface";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styled, { keyframes } from "styled-components";
import ExerciseList from "../data/exercise-add-list";
import { IWorkOutSlideProps } from "../today";

interface ISearchClearBtnProps {
    show: boolean;
}

interface ITodayWorkoutSlideProps extends IWorkOutSlideProps {
    target: string[];
    exercise: IExerciseInfo[];
    selectedDate: Date;
}

type record = {
    no: number;
    name: string;
}

export type IWorkoutRecord = {
    exerciseNo: number;
    exerciseName: string;
    exerciseTargets?: any;
    isCardio: boolean;
    strengthSets?: IStrengthSet[];
    time?: number;
    memo?: string;
}

export type IStrengthSet = {
    reps: number;
    weight: number;
}


export default function TodayAddWorkOutSlide({ target, exercise, isVisible, setIsVisible, selectedDate }: ITodayWorkoutSlideProps) {
    const [slideIn, setSlideIn] = useState<boolean>(isVisible);
    const [overlayVisible, setOverlayVisible] = useState<boolean>(isVisible);
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedQuery, setSelectedQuery] = useState<string>('');
    const [selectedSortQuery, setSelectedSortQuery] = useState<string>('전체');
    const [exerciseList, setExerciseList] = useState<IExerciseInfo[]>(exercise);
    const [isWorkoutDetailVisible, setIsWorkoutDetailVisible] = useState(false);
    const [selectedNo, setSelectedNo] = useState<number[]>([]);
    const [selectedName, setSelectedName] = useState<string[]>([]);
    const [selectedTargets, setSelectedTargets] = useState<string[][]>([]);
    const [workoutDetail, setWorkoutDetail] = useState<IWorkoutRecord[]>([]);
    const [detailSlideIn, setDetailSlideIn] = useState<boolean>(false);
    const sortQuery = ['전체', '즐겨찾기', '인기순', '선택순'];
    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedSearchText = useDebounce(searchValue, 300);
    const router = useRouter();

    useEffect(() => {
        if (isVisible) {
            setSlideIn(true);
            inputRef?.current?.focus();
        } else {
            setTimeout(() => setSlideIn(false), 10);
        }
    }, [isVisible]);

    useEffect(() => {
        if (selectedSortQuery === '전체' && selectedQuery) {
            setSelectedQuery('');
        }

        const filteredExercise = filterExercises(selectedSortQuery, selectedQuery, debouncedSearchText);
        setExerciseList([...filteredExercise]);
    }, [selectedSortQuery, selectedQuery, debouncedSearchText, exercise]);

    const filterExercises = (sortQuery: string, target: string, searchText: string) => {
        let filteredData = exercise;

        if (sortQuery === '즐겨찾기') {
            filteredData = filteredData.filter(item => item.favorite);
        }
        else if (sortQuery === '인기순') {
            filteredData = filteredData.sort((a, b) => b.favoriteCnt - a.favoriteCnt);
        }
        else if (sortQuery === '선택순') {
            filteredData = filteredData.sort((a, b) => b.selectCnt - a.selectCnt);
        }

        if (target) {
            filteredData = filteredData.filter(item => item.targets.includes(target));
        }

        if (searchText) {
            filteredData = filteredData.filter(item => item.name.includes(searchText));
        }

        return filteredData;
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSortQuerySelection = (query: string) => {
        if (query === '전체') {
            setSelectedSortQuery('전체');
            setSelectedQuery('');
        }
        else {
            if (selectedSortQuery === '전체') {
                setSelectedSortQuery('');
            }
            setSelectedSortQuery(query);
        }
    };

    const handleTargetSelection = (target: string) => {
        if (target === '전체') {
            setSelectedQuery('');
        }
        else {
            if (selectedSortQuery === '전체') {
                setSelectedSortQuery('');
            }
            setSelectedQuery(target);
        }
    };


    const onClose = () => {
        setSlideIn(false);
        setOverlayVisible(false);
        setTimeout(() => setIsVisible(false), 300);
    };

    const onCloseDetail = () => {
        setDetailSlideIn(false);
    };

    const handleRecordButtonClick = () => {
        const recordDetail: IWorkoutRecord[] = selectedNo.map((item, index) => {
            const isCardio = selectedTargets[index].includes("유산소");
            const initialCardioSet = { time: 0 };
            const initialStrengthSet = { reps: 0, weight: 0 };

            if (isCardio) {
                return {
                    exerciseNo: item,
                    exerciseName: selectedName[index],
                    exerciseTargets: selectedTargets[index],
                    isCardio,
                    cardioSets: [initialCardioSet],
                    strengthSets: undefined,
                };
            }
            else {
                return {
                    exerciseNo: item,
                    exerciseName: selectedName[index],
                    exerciseTargets: selectedTargets[index],
                    isCardio,
                    cardioSets: undefined,
                    strengthSets: [initialStrengthSet],
                };
            }
        });

        handleSelectedInit();
        setWorkoutDetail(recordDetail);
        setDetailSlideIn(true);
        setIsWorkoutDetailVisible(true);
    };

    const handleSelectedExercise = (exerciseNo: number, exerciseName: string, exerciseTargets: string[]) => {
        if (selectedNo.includes(exerciseNo)) {
            setSelectedNo(selectedNo.filter(item => item !== exerciseNo));
            setSelectedName(selectedName.filter(item => item !== exerciseName));
            setSelectedTargets(selectedTargets.filter(item => item !== exerciseTargets));
        }
        else {
            setSelectedNo([...selectedNo, exerciseNo]);
            setSelectedName([...selectedName, exerciseName]);
            setSelectedTargets([...selectedTargets, exerciseTargets]);
        }

    }

    const handleSelectedInit = () => {
        setSelectedNo([]);
        setSelectedName([]);
        setSelectedTargets([]);
    }

    const handleAddRow = (index: number) => {
        const updatedDetails = [...workoutDetail];
        const strength = { reps: 0, weight: 0 };
        updatedDetails[index].strengthSets?.push(strength);

        setWorkoutDetail(updatedDetails);
    };

    const handleDeleteWorkout = (index: number) => {
        const updatedData = [...workoutDetail];
        updatedData.splice(index, 1);
        setWorkoutDetail(updatedData);
    };

    const handleDeleteRow = (exerciseIndex: number, setIndex: number) => {
        const updatedData = JSON.parse(JSON.stringify(workoutDetail));
        if (updatedData[exerciseIndex].strengthSets) {
            updatedData[exerciseIndex].strengthSets.splice(setIndex, 1);
        }

        if (!updatedData[exerciseIndex].strengthSets || updatedData[exerciseIndex].strengthSets.length === 0) {
            handleDeleteWorkout(exerciseIndex);
        } else {
            setWorkoutDetail(updatedData); 
        }
        
    };
    


    const handleInputChange = (exerciseIndex: number, setIndex: number, name: keyof IStrengthSet | string, value: string) => {
        if (isNaN(Number(value))) return;

        const updatedDetails = [...workoutDetail];
        const isCardio = updatedDetails[exerciseIndex].isCardio;

        if (exerciseIndex < updatedDetails.length) {
            if (isCardio) {
                updatedDetails[exerciseIndex].time = parseFloat(value);
            }
            else {
                const strengthSets = updatedDetails[exerciseIndex].strengthSets;
                if (strengthSets && setIndex < strengthSets.length) {
                    if (name === "reps" || name === "weight") {
                        strengthSets[setIndex][name] = parseFloat(value);
                    }
                }
            }
        }

        setWorkoutDetail(updatedDetails);
    };


    const validateInput = (data: IWorkoutRecord[]): boolean => {
        for (const record of data) {
            if (record.isCardio) {
                if (!record.time || record.time <= 0) {
                    common500Alert("유산소 운동의 시간을 입력해주세요.");
                    return false;
                }
            } else {
                if (!record.strengthSets || record.strengthSets.some((set) => (!set.reps || set.reps <= 0))) {
                    common500Alert("근력 운동의 횟수를 입력해주세요.");
                    return false;
                }
            }
        }
        return true;
    };

    const handleWorkOutRecordSubmit = async () => {
        if (!validateInput(workoutDetail)) return;

        const response = await recordDoneExerciseAPI(workoutDetail, selectedDate);

        if (response?.status === 201) {
            commonDoneAlert('운동 기록이 성공적으로 등록되었습니다.');
            router.push('/workout');
        } else {
            common500Alert('운동 기록 등록에 실패하였습니다.');
        }
    }

    const [{ x }, set] = useSpring(() => ({ x: 0 }), []);
    const bind = useDrag(({ down, movement: [mx], distance }) => {
        if (distance > 10) {
            set({ x: down ? mx : 0 });
        }
    });

    return (
        <>
            {overlayVisible && <Overlay onClick={onClose} />}
            <SlideContainer $slideIn={slideIn}>
                <SlideTitleContainer>
                    <PrevBtn onClick={onClose}>
                        {'<'}
                    </PrevBtn>
                    <Search className="input-group">
                        <SearchIcon
                            src="/icon/btn/search.svg"
                            alt="search"
                            width={20}
                            height={20}
                        />
                        <SearchInput
                            ref={inputRef}
                            type="search"
                            className="form-control rounded"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                        <SearchInputSpan show={searchValue.length > 0} onClick={() => setSearchValue('')} />
                    </Search>
                </SlideTitleContainer>
                <SlideQueryList isTarget={false} items={sortQuery} selectedItem={selectedSortQuery} onSelectItem={handleSortQuerySelection} x={x} bind={bind} />
                <SlideQueryList isTarget={true} items={target} selectedItem={selectedQuery} onSelectItem={handleTargetSelection} x={x} bind={bind} />
                <ExerciseList
                    exercise={exerciseList}
                    selectedNo={selectedNo}
                    onRecordButtonClick={handleRecordButtonClick}
                    onSelectedInit={handleSelectedInit}
                    onSelectedExercise={handleSelectedExercise}
                />
            </SlideContainer>
            {isWorkoutDetailVisible && (
                <WorkOutRecordContainer $slideIn={detailSlideIn}>
                    <RecordTitleContainer>
                        <PrevBtn onClick={onCloseDetail}>
                            {'<'}
                        </PrevBtn>
                        <SubmitBtn variant='outline-light' onClick={handleWorkOutRecordSubmit}>
                            등록하기
                        </SubmitBtn>
                    </RecordTitleContainer>
                    {workoutDetail.map((item, index) => (
                        <WorkOutRecordDetailContainer key={index}>
                            <TitleContainer>
                                <RecordTitle>{item.exerciseName}</RecordTitle>
                                <DeleteWorkoutBtn variant="outline-danger" onClick={() => handleDeleteWorkout(index)}>삭제</DeleteWorkoutBtn>
                            </TitleContainer>
                            {item.exerciseTargets.includes('유산소') ? (
                                <WorkOutRecordDetail>
                                    <thead>
                                        <th>시간</th>
                                    </thead>
                                    <tbody>
                                        <tr key={1}>
                                            <td>
                                                <RecordInput
                                                    name="time"
                                                    type="number"
                                                    placeholder="시간(분)"
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
                                        <TableHeader index={1}>세트</TableHeader>
                                        <TableHeader index={2}>횟수</TableHeader>
                                        <TableHeader index={3}>무게</TableHeader>
                                    </thead>
                                    <tbody>
                                        {item.strengthSets?.map((set, setIndex) => (
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
                                                        onChange={(e) => handleInputChange(index, setIndex, "reps", e.target.value)}
                                                    />
                                                    회
                                                </TableCell>
                                                <TableCell index={3}>
                                                    <RecordInput
                                                        type="number"
                                                        name='weight'
                                                        placeholder="무게"
                                                        onChange={(e) => handleInputChange(index, setIndex, "weight", e.target.value)}
                                                    />
                                                    kg
                                                </TableCell>
                                                <TableCell index={4}>
                                                    <DeleteRowBtn variant='outline-danger' onClick={() => handleDeleteRow(index, setIndex)}>X</DeleteRowBtn>
                                                </TableCell>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={3} style={{ textAlign: 'center' }}>
                                                <AddButton variant='outline-danger' onClick={() => handleAddRow(index)}>+세트추가</AddButton>
                                            </td>
                                        </tr>
                                    </tbody>
                                </WorkOutRecordDetail>
                            )}
                            {index < workoutDetail.length - 1 && <hr style={{ width: '100%' }} />}
                        </WorkOutRecordDetailContainer>
                    ))}
                </WorkOutRecordContainer>
            )}
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
    padding: 20px;
    @media (max-width: 768px) {
        height: 85px;
    }
    @media (max-width: 375px) {
        height: 70px;
    }
`;

const RecordTitleContainer = styled.div`
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
`

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

const Search = styled.div`    
    position: relative;
    display: flex;
    width: 90% !important;
    height: 100%;
    margin: 0 auto;
    @media (max-width: 576px) {
        width: 80% !important;
    }
    @media (max-width: 375px) {
        width: 75% !important;
    }
`;

const SearchIcon = styled(Image)`
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    z-index: 10;
    @media (max-width: 576px) {
        left: 10px;
        width: 18px;
        width: 18px;
    }
    @media (max-width: 375px) {
        width: 15px;
        height: 15px;
        top: 60%;
    }
`

const SearchInput = styled.input`
    color: white !important;
    caret-color: var(--bs-danger); 
    background-color: var(--bs-gray-700) !important;
    background-position: 10px left;
    padding-left: 50px !important;
    border: none !important;
    @media (max-width: 576px) {
        padding-left: 40px !important;
    }
    @media (max-width: 375px) {
        padding-left: 35px !important;
    }
`

const SearchInputSpan = styled.span<ISearchClearBtnProps>`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-color: black;    
    display: ${props => props.show ? 'flex' : 'none'}; // 조건부 display 속성
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;

    &::before {
        content: '×';
        color: white;
        font-size: 16px;
    }

    @media (max-width: 375px) {
        top: 60%;
        width: 15px;
        height: 15px;
        right: 5px;
        &::before {
            font-size: 12px;
        }
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


const WorkOutRecordContainer = styled.div<{ $slideIn: boolean }>`
    position: fixed;    
    transform: translate(-50%, -50%);    
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 50px;
    background-color: #000000;
    z-index: 10;
    opacity: ${({ $slideIn }) => $slideIn ? 1 : 0};
    transition: opacity 0.5s;
    animation: ${({ $slideIn }) => $slideIn ? slideUp : slideDown} 0.5s ease forwards;
`;

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
    font-size: 1rem;
    @media (max-width: 280px) {
        font-size: 0.7rem;
    }
    @media (max-width: 375px) {
        font-size: 0.8rem;
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
    padding: 10px;
    ${(props) => (props.index === 1 && `
        width: 20%;
    `)}

    @media (max-width: 280px) {
        font-size: 0.6rem;
    }
    @media (max-width: 375px) {
        font-size: 0.8rem;
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

const SubmitBtn = styled(Button)`
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