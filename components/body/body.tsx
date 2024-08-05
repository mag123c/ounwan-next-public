import { TUser } from "@/interfaces/user.interface";
import styled from "styled-components";
import MyBodyInfoSection from "./components/myinfo/my";
import MyBodyInfoStatisticsSection from "./components/statistic/statistics";

export default function BodyDetailSection({ user, body, recent }: TUser) {

    return (
        <>
            <BodyDetailContainer>
                <MyBodyInfoSection
                    user={user}
                    height={recent.height}
                    weight={recent.weight}
                    fat={recent.fat}
                    muscleMass={recent.muscleMass}
                />
                <MyBodyInfoStatisticsSection body={body} />
            </BodyDetailContainer>
        </>
    )
}

const BodyDetailContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`