import { deleteMyBodyInfoAPI, putMyBodyInfoAPI } from "@/api/body/body";
import { common500Alert } from "@/components/common/sweetalert/500.alert";
import { deleteConfirm } from "@/components/common/sweetalert/etc";
import { IBodyInfo, IBodyInfoProps } from "@/interfaces/user.interface";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

export default function StatisticsList({ body }: IBodyInfoProps) {

    const [editRow, setEditRow] = useState<number | null>(null);
    const [editWeight, setEditWeight] = useState<number | null>(null);
    const [editMuscleMass, setEditMuscleMass] = useState<number | null>(null);
    const [editFat, setEditFat] = useState<number | null>(null);
    const [bodyList, setBodyList] = useState<IBodyInfo[]>(body);

    const handleEdit = (item: IBodyInfo) => {
        setEditRow(item.no);
        setEditWeight(item.weight);
        setEditMuscleMass(item.muscleMass);
        setEditFat(item.fat);
    };

    const handleCancel = () => {
        setEditRow(null);
    };

    const handleSave = async (item: IBodyInfo) => {
        item.weight = editWeight || null;
        item.muscleMass = editMuscleMass || null;
        item.fat = editFat || null;

        console.log(item);

        await putMyBodyInfoAPI(item)
            .then((result) => {
                setBodyList(result.data);
            })
            .catch((e) => common500Alert('변경 실패'));
        setEditRow(null);
    };

    const handleRemove = async (e: any, exercise: IBodyInfo) => {
        e.stopPropagation();

        if (await deleteConfirm()) {
            await deleteMyBodyInfoAPI(exercise.no)
                .then((result) => {
                    setBodyList(result.data);
                })
                .catch((e) => common500Alert('삭제 실패'));

            setEditRow(null);
        }
    }

    return (
        <ListContainer>
            {bodyList && bodyList.length > 0 && (
                <ListTable>
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>몸무게(kg)</th>
                            <th>근육량(kg)</th>
                            <th>체지방(%)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bodyList.map((item, index) => (
                            <tr key={index}>
                                <TableCell>
                                    <DateDisplay>
                                        {item.createdAt ? item.createdAt.toString().split("T")[0].slice(2) : '-'}
                                        <Modify
                                            src={'/icon/btn/edit.svg'}
                                            alt="edit"
                                            width={15}
                                            height={15}
                                            onClick={() => handleEdit(item)}
                                        />
                                    </DateDisplay>
                                </TableCell>
                                <TableCell>
                                    {editRow === item.no ? (
                                        <ModifyInput
                                            type="number"
                                            defaultValue={item.weight || ''}
                                            onChange={(e) => setEditWeight(Number(e.target.value))}
                                        />
                                    ) : (
                                        item.weight
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editRow === item.no ? (
                                        <ModifyInput
                                            type="number"
                                            defaultValue={item.muscleMass || ''}
                                            onChange={(e) => setEditMuscleMass(Number(e.target.value))}
                                        />
                                    ) : (
                                        item.muscleMass
                                    )}
                                </TableCell>
                                <TableCell>
                                    <ActionsContainer>
                                        {editRow === item.no ? (
                                            <>
                                                <ModifyInput
                                                    type="number"
                                                    defaultValue={item.fat || ''}
                                                    onChange={(e) => setEditFat(Number(e.target.value))}
                                                />
                                                <ModifyIcons>
                                                    <Check
                                                        src={'/icon/btn/check.png'}
                                                        alt="check"
                                                        width={15}
                                                        height={15}
                                                        onClick={() => handleSave(item)}
                                                    />
                                                    <Cancel
                                                        src={'/icon/btn/cancel.svg'}
                                                        alt="cancel"
                                                        width={15}
                                                        height={15}
                                                        onClick={handleCancel}
                                                    />
                                                </ModifyIcons>
                                            </>
                                        ) : (
                                            <>
                                                {item.fat}
                                                <ActionIcons>
                                                    <Delete
                                                        src={'/icon/btn/trash.svg'}
                                                        alt="trash"
                                                        width={15}
                                                        height={15}
                                                        onClick={(e) => handleRemove(e, item)}
                                                    />
                                                </ActionIcons>
                                            </>
                                        )}
                                    </ActionsContainer>
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </ListTable>
            )}
        </ListContainer>
    )
}

const ListContainer = styled.div`
    text-align: center;
    width: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
`

const ListTable = styled.table`
    width: 90%;
    color: white;
    text-align: left;
    background-color: transparent;    
    border-collapse: separate;
    border-spacing: 0 1.3rem;      
      
    th, td {
        border-bottom: 1px solid #dee2e6;
        text-align: center;
    }
    tr {
        
    }

    @media screen and (max-width: 768px) {
        width: 100%;
    }
    @media screen and (max-width: 576px) {
        th, td {
            padding: 0.5rem;
            font-size: 0.8rem;
        }
    }
    @media screen and (max-width: 320px) {
        th, td {
            padding: 0.5rem;
            font-size: 0.6rem;
        }
    }

`

const Modify = styled(Image)`   
    cursor: pointer;
    margin-left: 3%;
    @media (max-width: 480px) {
        height: 10px !important;
        width: 10px !important;
    }
`
const Delete = styled(Image)`   
    cursor: pointer;
    @media (max-width: 480px) {
        height: 10px !important;
        width: 10px !important;
    }
`

const Check = styled(Image)`   
    cursor: pointer;
    margin: 10%;
    @media (max-width: 480px) {
        height: 10px !important;
        width: 10px !important;
        margin: 20%;
    }
`

const Cancel = styled(Image)`   
    cursor: pointer;
    margin: 10%;
    @media (max-width: 480px) {
        height: 10px !important;
        width: 10px !important;
        margin: 20%;
    }
`

const ModifyInput = styled.input`
    background-color: black;
    color: white;
    text-align: center;
    width: 100%;
    box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
    font-size: 0.8rem;
    padding: 0.25rem; /* 텍스트와 유사한 패딩 설정 */

    @media(max-width: 576px) {
        font-size: 0.6rem;
        padding: 0.2rem; /* 작은 화면에서도 동일한 크기 유지 */
    }
    @media(max-width: 280px) {
        font-size: 0.5rem;
        padding: 0.15rem; /* 작은 화면에서도 동일한 크기 유지 */
    }
`;

const DateDisplay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%; /* 테이블 셀의 높이와 맞추기 */
`;

const TableCell = styled.td`
    width: 25%; /* 각 컬럼의 고정된 너비 설정 */
    text-align: center;
    vertical-align: middle; /* 세로 정렬을 중앙으로 설정 */
`;


const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const ActionIcons = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: -10%;
`;

const ModifyIcons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
    position: absolute;
    right: -10%;

    @media(max-width: 576px) {
        right: -20%;
    }
    @media(max-width: 430px) {
        right: -30%;
    }
    @media(max-width: 375px) {
        right: -45%;
    }
    @media(max-width: 280px) {
        right: -60%;
    }
`;
