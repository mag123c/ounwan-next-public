import { IWholeWorkout } from '@/interfaces/exercise.interface';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface IPastCalendarProps {
    wholeWorkout: IWholeWorkout[];
    dayClick: (value: Date) => void;
  }

export default function PastCalendar({ wholeWorkout, dayClick }: IPastCalendarProps) {
    const today = new Date();
    const [value, setValue] = useState<Value>(null);
    const [activeDate, setActiveDate] = useState<Date | null>(null);
    const [attendDay, setAttendDay] = useState<string[]>([]);


    useEffect(() => {
        setValue(today);
        setActiveDate(today);
        setAttendDay(wholeWorkout.map(workout => workout.date));
    }, []);

    if (!value) {
        return null;
    }


    const handleTodayClick = () => {
        setActiveDate(today);
        setValue(today);

        dayClick(activeDate as Date);
    };



    return (
        <>
            <StyledCalendar
                value={value}
                onChange={setValue}
                onClickDay={dayClick}
                formatDay={(locale, value) => moment(value).format("D")}
                formatYear={(locale, value) => moment(value).format("YYYY")}
                formatMonthYear={(locale, value) => moment(value).format("YYYY. MM")}
                calendarType="gregory"
                showNeighboringMonth={false}
                next2Label={null}
                prev2Label={null}
                minDetail="year"
                activeStartDate={activeDate === null ? undefined : activeDate}
                onActiveStartDateChange={({ activeDate }: any) =>
                    setActiveDate(activeDate)
                }
                tileContent={({ date, view }) => {
                    let html = [];
                    if (view === "month" && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
                        html.push(<StyledDot key={`${moment(date).format("YYYY-MM-DD")}-today`} style={{ top: '75%', backgroundColor: 'var(--bs-gray-300)' }} />);
                    }
                    if (attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                        html.push(<StyledDot key={`${moment(date).format("YYYY-MM-DD")}-attend`} />);
                    }
                    return <>{html}</>;
                }}
            />
            <StyledDate onClick={handleTodayClick}>오늘</StyledDate>
        </>

    );
}

export const StyledCalendar = styled(Calendar)`
    background-color: var(--bs-gray-900) !important;
    width: 100%;
    .react-calendar__navigation__arrow {
        background-color: var(--bs-gray-900) !important;
        &:hover {
            background-color: var(--bs-gray-900) !important;
        }
    }
    .react-calendar__navigation__label {
        pointer-events: none !important;
        background-color: var(--bs-gray-900) !important;
        &:hover {
            background-color: var(--bs-gray-900) !important;
        }
    }
    .react-calendar__tile--active {
        background-color: var(--bs-gray-700) !important;
        &:hover {
            background-color: var(--bs-gray-700) !important;
        }
        &:focus {
            background-color: var(--bs-gray-700) !important;
        }
    }
`;

export const StyledDate = styled.div`
  position: absolute;
  right: 7%;
  top: 6%;
  background-color: var(--bs-gray-300);
  color: black;
  width: 10%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;

  @media (max-width: 576px) {
    font-size: 0.7rem;
  }
  @meaida (max-width: 376px) {
    font-size: 0.6rem !important;
  }

`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
  font-size: x-small;
  color: var(--bs-warning);
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

/* 출석한 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
  background-color: red;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;