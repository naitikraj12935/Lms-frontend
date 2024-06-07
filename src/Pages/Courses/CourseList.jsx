import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeLayout from "../../Layout/HomeLayout";
import { getAllcourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "./CourseCard";

export default function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector(state => state.course);

    async function loadCourse() {
        await dispatch(getAllcourses());
    }

    useEffect(() => {
        loadCourse();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-8 md:px-20 flex flex-col gap-10 text-white">
                <h1 className="text-3xl font-semibold">
                    Explore the courses made by
                    <span className="font-bold text-yellow-500"> Industry Experts</span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-10 justify-start">
                    {courseData?.map((course) => (
                        <CourseCard key={course._id} data={course} />
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}
