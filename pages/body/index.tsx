import BaseComponents from "@/components/base/base";
import BodyDetailSection from "@/components/body/body";
import { TUser } from "@/interfaces/user.interface";
import { bodySSR } from "@/service/login/page/body/body.service";
import { AppContainer } from "@/styles/appContainer";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

function BodyInfo({ user, body, recent }: TUser) {

    return (
        <>
            <AppContainer>
                {(user && body && recent) && (<BodyDetailSection user={user} body={body} recent={recent} />)}
                <BaseComponents title={""} description={""} image={""} url={""} role={user.role as string} />
            </AppContainer>
        </>
    )
}

export default BodyInfo;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    return await bodySSR(ctx);
}