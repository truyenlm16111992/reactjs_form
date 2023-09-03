import { StudentFormTemplate, StudentListTemplate } from "components"
export const BTForm = () => {
    return (
        <div className="container lg:max-w-[1024px] mx-auto">
            <StudentFormTemplate/>
            <StudentListTemplate/>
        </div>
    )
}