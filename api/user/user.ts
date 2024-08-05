// apis/authApi.js
import { SignupUserInfoProps } from '@/components/signup/section';
import axios from 'axios';

export const geOauthFromKakao = async () => {
  window.location.href = `${process.env.NEXT_PUBLIC_NEST_URL}/auth/signin/kakao`;
};

export const getOauthFromNaver = async () => {
  window.location.href = `${process.env.NEXT_PUBLIC_NEST_URL}/auth/signin/naver`;
}

export const getOauthFromGoogle = async () => {
  window.location.href = `${process.env.NEXT_PUBLIC_NEST_URL}/auth/signin/google`;
}


export const signup = async (signUpData: SignupUserInfoProps) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_NEST_URL}/auth/signup`, signUpData);
  return response.data;
}

export const getUserInfo = async (accessToken: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_NEST_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response.data;
}

export const validateRefreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_NEST_URL}/auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      withCredentials: true,
    },
    );    
    const token = response.data;
    return token;
  }
  catch (e) {
    return false;
  }

}