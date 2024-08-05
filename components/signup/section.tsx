
import { signup } from '@/api/user/user';
import { setAccessToken, setRefreshToken } from '@/service/token.service';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { SignupFailed } from '../common/sweetalert/400.alert';
import { Signup500Failed } from '../common/sweetalert/500.alert';
import { signUpSuccessAlert } from '../common/sweetalert/component.alert';
import SignupHeightWeight from './heightweight/height-weight';
import SignupNickname from './nickname/nickname';
import SignupSex from './sex/sex';
import SignupYear from './year/year';

interface UserInfoProps {
    userId: string;
    userType: number;
    userNo: string;
}

export interface SignupUserInfoProps {
    userId: string;
    snsType: number;
    snsNo: string;
    year: number;
    height: string;
    weight: string;
    sex: number;
    nickname: string;
}

function SignupSection({ userId, userType, userNo }: UserInfoProps) {

    const [year, setYear] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [sex, setSex] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');

    const router = useRouter();

    const sexRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);
    const heightWeightRef = useRef<HTMLDivElement>(null);
    const nicknameConRef = useRef<HTMLDivElement>(null);
    const nicknameRef = useRef<HTMLInputElement>(null);
    const successBtnRef = useRef<HTMLDivElement>(null);

    const scrollToRef = (ref: any) => {
        if (ref && ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (sex) scrollToRef(yearRef);
    }, [sex]);

    useEffect(() => {
        if (year) scrollToRef(heightWeightRef);
    }, [year]);

    useEffect(() => {
        if (height && weight) {            
            scrollToRef(nicknameConRef);
        }
    }, [height, weight]);

    useEffect(() => {
        if (nickname) scrollToRef(successBtnRef);
    }, [nickname]);

    const handleSubmit = async (e: React.FormEvent) => {

        const signUpData: SignupUserInfoProps = {
            userId: userId,
            snsType: userType,
            snsNo: userNo,
            sex: sex === '남' ? 1 : 2,
            year: Number(year),
            height: height,
            weight: weight,
            nickname: nickname,
        };

        dataCheck();

        signupApi(signUpData);

    }

    const signupApi = async (signUpData: SignupUserInfoProps) => {
        try {
            const response = await signup(signUpData);

            if (response.accessToken) {

                await signUpSuccessAlert();

                setAccessToken(response.accessToken);
                setRefreshToken(response.refreshToken);
                router.push(`${process.env.NEXT_PUBLIC_NEXT_URL}/main`);
            }
        }
        catch (e: any) {
            if (e.response.data.errorCode === 400201) {
                SignupFailed(e.response.data.message);     
                scrollToRef(nicknameRef);        
            }
            else Signup500Failed();
            
        }
    }

    const dataCheck = () => {
        if (!sex) {
            scrollToRef(sexRef);
            return;
        } else if (!year) {
            scrollToRef(yearRef);
            return;
        } else if (!height || !weight) {
            scrollToRef(heightWeightRef);
            return;
        } else if (!height || !weight) {
            scrollToRef(nicknameRef);
            nicknameRef.current?.focus();
            return;
        }
    }



    return (
        <>
            <SignupContainer>
                <SignupSex ref={sexRef} setSex={setSex} />
                {sex && <SignupYear ref={yearRef} setYear={setYear} />}
                {year &&
                    <SignupHeightWeight
                        ref={heightWeightRef} setHeight={setHeight} setWeight={setWeight}
                    />}
                {(height && weight) && <SignupNickname ref={nicknameConRef} setNickname={setNickname} />}
                {nickname &&
                    <div ref={successBtnRef}>
                        <Button size="lg" variant="outline-light" onClick={handleSubmit}>시작하기</Button>
                    </div>}
            </SignupContainer>
        </>
    );
}

export default SignupSection;

export const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    height: 100vh;
`
export const TextMessage = styled.h1`
    margin: 20px;
`