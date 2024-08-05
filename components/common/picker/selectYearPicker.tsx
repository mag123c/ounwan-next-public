import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';
import Picker from "react-mobile-picker";
import styled from "styled-components";

interface PickerValue {
    [key: string]: string;
}

interface SignupYearProps {
    setYear: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectYearPicker({ setYear }: SignupYearProps) {

    const currentYear = new Date().getFullYear();
    const yearSet = Array.from({ length: 81 }, (_, i) => String(currentYear - i));

    const [tempYear, setTempYear] = useState<string>('2000');
    const [pickerValue, setPickerValue] = useState<PickerValue>({
        year: '2000',
    });
    const [confirmedYear, setConfirmedYear] = useState<string>('');

    const onChange = useCallback((newValue: PickerValue) => {
        const { year } = newValue;
        setPickerValue({ ...newValue, year: year });
        setTempYear(year);
    }, []);

    const onConfirm = useCallback(() => {
        setYear(tempYear);
        setConfirmedYear(tempYear);
    }, [tempYear, setYear]);


    return (
        <>
            <PickerContainer>
                <Picker
                    value={pickerValue}
                    onChange={onChange}
                    wheelMode="natural"
                    height={204}
                    itemHeight={68}
                >
                    <Picker.Column name="year">
                        {yearSet.map((year) => (
                            <Picker.Item key={year} value={year}>
                                <YearSpan
                                    style={{ color: year === confirmedYear ? "#ffc107" : "inherit" }}
                                >
                                    {year}년
                                </YearSpan>
                            </Picker.Item>
                        ))}
                    </Picker.Column>
                </Picker>
            </PickerContainer>
            <YearSelectButton variant="outline-light" onClick={onConfirm}>
                선택
            </YearSelectButton>
        </>
    );
}


const PickerContainer = styled.div`
    width: 80%;
    background-color: var(--bs-dark);
    border-radius: 10px;
`

const YearSpan = styled.span`
    font-size: 1.2rem;
`

const YearSelectButton = styled(Button)`
    margin: 20px;
`
