import { saveBodyInfo } from "@/api/body/body";
import moment from "moment";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import styled from "styled-components";

interface RecordSectionProps {
    setSlideIn: (value: boolean) => void;
}

export const RecordSection = ({ setSlideIn }: RecordSectionProps) => {

    const router = useRouter();

    const [dateValue, setDateValue] = useState<Date>();
    const [weightValue, setWeightValue] = useState<number>(0);
    const [muscleMassValue, setMuscleMassValue] = useState<number>(0);
    const [fatValue, setFatValue] = useState<number>(0);

    const weightRef = useRef<HTMLInputElement>(null);
    const muscleMassRef = useRef<HTMLInputElement>(null);
    const fatRef = useRef<HTMLInputElement>(null);

    const handleDatachange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 5) {
            return;
        }
        if (e.target.name === "weight") {
            setWeightValue(Number(e.target.value));
        } else if (e.target.name === "muscleMass") {
            setMuscleMassValue(Number(e.target.value));
        } else if (e.target.name === "fat") {
            setFatValue(Number(e.target.value));
        }
    }


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (!dateValue || (!weightValue && !muscleMassValue && !fatValue)) {
            focusInput();
            return;
        }

        const data = await saveBodyInfo(moment(dateValue).format('YYYY-MM-DD'), weightValue, muscleMassValue, fatValue);     
        if (data) {
            setSlideIn(false);
            router.push('/body');
        }

    }

    const focusInput = () => {
        if (!weightValue) {
            weightRef.current?.focus();

            weightRef.current?.classList.add('focusedInput');
            setTimeout(() => {
                weightRef.current?.classList.remove('focusedInput');            
            }, 1000)
            return;
        }
        if (!muscleMassValue) {
            muscleMassRef.current?.focus();

            muscleMassRef.current?.classList.add('focusedInput');
            setTimeout(() => {
                muscleMassRef.current?.classList.remove('focusedInput');            
            }, 1000)
            return;
        }
        if (!fatValue) {
            fatRef.current?.focus();
            
            fatRef.current?.classList.add('focusedInput');
            setTimeout(() => {
                fatRef.current?.classList.remove('focusedInput');            
            }, 1000)
            return;
        }
    }


    return (
        <>
            <RecordContainer>
                <Label htmlFor="date">기록 날짜</Label>
                <InputContainer>
                    <DatePicker
                        selected={dateValue}
                        onChange={(date: Date) => setDateValue(date)}
                        isClearable={false}
                        dateFormat="yyyy-MM-dd"
                        customInput={<InputDate />}
                    />
                </InputContainer>
            </RecordContainer>
            <Divide />
            <RecordContainer>
                <Label htmlFor="date">체중</Label>
                <InputContainer>
                    <InputNumber
                        ref={weightRef}
                        type="number"
                        id="weight"
                        name="weight"
                        value={weightValue > 0 ? weightValue : ''}
                        onChange={handleDatachange} />
                    <Unit>kg</Unit>
                </InputContainer>
            </RecordContainer>
            <Divide />
            <RecordContainer>
                <Label htmlFor="date">근육량</Label>
                <InputContainer>
                    <InputNumber
                        ref={muscleMassRef}
                        type="number"
                        id="muscleMass"
                        name="muscleMass"
                        value={muscleMassValue > 0 ? muscleMassValue : ''}
                        onChange={handleDatachange} />
                    <Unit>kg</Unit>
                </InputContainer>
            </RecordContainer>
            <Divide />
            <RecordContainer>
                <Label htmlFor="date">체지방</Label>
                <InputContainer>
                    <InputNumber
                        ref={fatRef}
                        type="number"
                        id="fat"
                        name="fat"
                        value={fatValue > 0 ? fatValue : ''}
                        onChange={handleDatachange} />
                    <Unit>%</Unit>
                </InputContainer>
            </RecordContainer>
            <ModifyBtn
                variant={'outline-light'}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
            >
                등록하기
            </ModifyBtn>
        </>
    )
}

const RecordContainer = styled.div`
    width: 80%;
    display: flex;    
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 2%;
`
const Divide = styled.hr`
    width: 100%;
`
const Label = styled.label`
    margin-right: auto;
    text-align: left;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const InputDate = styled.input`
    background-color: transparent;
    border: none;
    text-align: right;
    &:focus {
        outline: none;
    }
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%23ffc107" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
    background-repeat: no-repeat;
    background-position: right center;
    padding-right: 20px;
    cursor: pointer;
`;

const InputNumber = styled.input`
    background-color: transparent;
    border: none;
    text-align: right;
    &:focus {
        outline: none;
    }
`;

const Unit = styled.span`
    margin-left: 5px;
    color: var(--bs-warning);
`

const ModifyBtn = styled(Button)`
    position: fixed;
    bottom: 5%;
    width: 80%;    
`
