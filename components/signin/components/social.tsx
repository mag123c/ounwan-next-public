import { Button } from "react-bootstrap";
import styled from "styled-components";

type TSocialInfo = 'kakao' | 'naver' | 'google';
const socialInfos: Record<TSocialInfo, string> = {
    'kakao': '카카오',
    'naver': '네이버',
    'google': '구글',
};
const socialColors: Record<TSocialInfo, string> = {
    'kakao': 'warning',
    'naver': 'success',
    'google': 'light',
};

export default function SocialSignin() {


    return (
        <SocialButtonContainer>
            {Object.entries(socialInfos).map(([key, value]) => (
                <Button
                    key={key}
                    variant={socialColors[key as TSocialInfo]}
                    style={{ margin: '10px' }}
                >
                    {value} 로그인
                </Button>
            ))}
        </SocialButtonContainer>
    );
}

export const SocialButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`