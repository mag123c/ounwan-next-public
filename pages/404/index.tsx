import ErrorPage from "@/components/error/error-page";
import { AppContainer } from "@/styles/appContainer";

const Custom404 = () => {
  return (
    <AppContainer>
      <ErrorPage code={404} message="페이지를 찾을 수 없습니다." />
    </AppContainer>
  )
};

export default Custom404;