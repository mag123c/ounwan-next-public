import { IUserInfo } from "@/interfaces/user.interface";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import BodyInfoModifySection from "./detail";
import { ModifyInfoSlide } from "./modify-slide";

export interface IModifyBodyInfoProps {
    user: IUserInfo;
    height: number;
    weight: number;
    fat: number;
    muscleMass: number;
}


export default function MyBodyInfoSection({ user, height, weight, fat, muscleMass }: IModifyBodyInfoProps) {

    const [isModify, setIsModify] = useState<boolean>(false);

    return (
        <MyBodyInfoContainer>
            <MyBodyInfoTitleContainer>
                <Title>내정보</Title>
                <ModifyBtn
                    src="/icon/btn/add-btn.svg"
                    width={30}
                    height={30}
                    alt="add-btn"
                    onClick={() => setIsModify(!isModify)}
                />
            </MyBodyInfoTitleContainer>
            {isModify && <ModifyInfoSlide isModify={isModify} setIsModify={setIsModify} />}
            <BodyInfoModifySection height={height} weight={weight} fat={fat} muscleMass={muscleMass} />
        </MyBodyInfoContainer>
    )
}

const MyBodyInfoContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;    
    align-items: center;
`;

const MyBodyInfoTitleContainer = styled.div`
    width: 100%;    
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h2`
    margin-top: 20px;
    margin-left: 2%;
`;

const ModifyBtn = styled(Image)`
    margin-top: 20px;
    margin-right: 2%;
    cursor: pointer;
    @media (max-width: 576px) {
        width: 25px;
        height: 25px;
    }
    @media (max-width: 375px) {
        width: 20px;
        height: 20px;
    }
`