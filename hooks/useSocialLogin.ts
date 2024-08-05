// useSocialLogin.js
import { signUpProcessingAlert } from '@/components/common/sweetalert/component.alert';
import { useRouter } from 'next/router';
import { useEffect } from 'react';



const useSocialLogin = (loginTarget: string): void => {

    const router = useRouter();

    useEffect(() => {
        const handleLogin = async () => {
            if (!router.isReady) return;

            if (loginTarget) {
                await pushSignUpPage(loginTarget);
            }

        };
        handleLogin();
    }, [router.isReady, router.query, loginTarget]);



    const pushSignUpPage = async (loginTarget: string) => {
        const { userId, no } = router.query;

        await signUpProcessingAlert();

        return router.push({
            pathname: '/signup',
            query: { snsType: loginTarget, userId: userId, no: no },
        })
    }
}

export default useSocialLogin;