import Error403Page from "@/components/error/403";

export default function Page403() {

    return (
        <Error403Page code={403} message="인증 필요"></Error403Page>
    );

}