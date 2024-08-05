import HeadMeta from "@/components/common/meta/head";
import SigninSection from "@/components/signin/section";
import { signinSSR } from "@/service/login/page/signin/signin.service";
import { AppContainer } from "@/styles/appContainer";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

function Signin(isLogined: boolean) {

    return (
        <>
            <AppContainer>
                <HeadMeta title={""} description={""} image={""} url={""} />
                <SigninSection />
            </AppContainer>
        </>
    )


}

export default Signin;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    return await signinSSR(ctx);

}