import { LoadingSpinner } from '@/components/common/loding/loding';
import { useLoading } from '@/hooks/useLoading';
import GlobalStyle from '@/styles/globalStyle';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';


declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}

function App({ Component, pageProps }: AppProps) {
  const isLoading = useLoading();
  const router = useRouter();
  const isNotPaddingArr = ['/signin', 'signup', '/main'];
  const isNotPadding = isNotPaddingArr.some((path) => router.pathname.includes(path));
  
  useEffect(() => {
    kakaoInit();
  }, [])

  const kakaoInit = () => {
    try {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        }
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <GlobalStyle isNotPadding={isNotPadding} />
      {isLoading ? <LoadingSpinner /> : <Component {...pageProps} />}
      <SpeedInsights />
      <Analytics />
      <Script />
    </>
  );

}

export default App;
