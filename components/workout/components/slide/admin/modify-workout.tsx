import { Overlay } from "@/components/common/overlay/overlay";
import useDebounce from "@/hooks/useDebounce";
import { IExerciseInfo } from "@/interfaces/exercise.interface";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import AdminExerciseList from "../../data/admin/exercise-list";
import { IWorkOutSlideProps } from "../../today";
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


export default function AdminModifyWorkOutSlide({ target, exercise, isVisible, setIsVisible, selectedDate }: ITodayWorkoutSlideProps) {
    const [slideIn, setSlideIn] = useState<boolean>(isVisible);
    const [overlayVisible, setOverlayVisible] = useState<boolean>(isVisible);
    const [searchValue, setSearchValue] = useState<string>('');
    const [exerciseList, setExerciseList] = useState<IExerciseInfo[]>(exercise);
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
        const filteredExercise = filterExercises(debouncedSearchText);
        setExerciseList([...filteredExercise]);

    }, [debouncedSearchText])

    const filterExercises = (searchText: string) => {
        let filteredData = exercise;


        if (searchText) {
            filteredData = filteredData.filter(item => item.name.includes(searchText));
        }

        return filteredData;
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const onClose = () => {
        setSlideIn(false);
        setOverlayVisible(false);
        setTimeout(() => setIsVisible(false), 300);
    };


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
                        <SearchInputSpan $show={searchValue.length > 0} onClick={() => setSearchValue('')} />
                    </Search>
                </SlideTitleContainer>
                <AdminExerciseList
                    target={target}
                    exercise={exerciseList}
                />
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

const SearchInputSpan = styled.span<{ $show: boolean }>`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-color: black;    
    display: ${({ $show }) => $show ? 'flex' : 'none'};
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