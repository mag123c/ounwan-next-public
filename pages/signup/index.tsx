import HeadMeta from "@/components/common/meta/head";
import SignupSection from "@/components/signup/section";
import { AppContainer } from "@/styles/appContainer";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Signup() {

    const router = useRouter();
    const { snsType, no, userId } = router.query;

    useEffect(() => {
        if (!snsType || !no || !userId) {
            router.push('/');
        }
    }, [snsType, no, userId]);

    return (
        <>
            <AppContainer>
                <HeadMeta title={""} description={""} image={""} url={""} />
                <SignupSection
                    userId={userId as string}
                    userType={Number(snsType as string)}
                    userNo={no as string}
                />
            </AppContainer>
        </>
    )
}

export default Signup;