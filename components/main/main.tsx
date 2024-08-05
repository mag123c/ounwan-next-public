import { IUserInfoProps } from "@/interfaces/user.interface";
import QuickStartSection from "./components/quickstart/quickstart";

export function MainSection({ user }: IUserInfoProps) {

    return (
        <>
            <QuickStartSection />              
            {/* <BodyInfoSection height={user.height} weight={user.weight} sex={user.sex} />
            <WorkingOutSection />
            <MealSection /> */}
        </>
    )
}