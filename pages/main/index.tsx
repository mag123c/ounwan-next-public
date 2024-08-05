import BaseComponents from "@/components/base/base";
import { MainSection } from "@/components/main/main";
import { IUserInfoProps } from "@/interfaces/user.interface";
import { mainSSR } from "@/service/login/page/main/main.service";
import { AppContainer } from "@/styles/appContainer";
import { GetServerSidePropsContext } from "next";

function Main({ user }: IUserInfoProps) {

    return (
        <>
            <AppContainer style={{ 'justifyContent': 'center' }}>
                <MainSection user={user} />
                <BaseComponents title={""} description={""} image={""} url={""} role={user.role as string} />
                {/* <Grass exerciseDates={['2024-05-07', '2024-04-07']}></Grass> */}
            </AppContainer>
        </>
    )
}

export default Main;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    return await mainSSR(ctx);

}