// app/page.tsx
import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/api/courses";
import { Course } from "../types/courses";
import SearchableCourses from "@/components/SearchableCourses"; // client component

export default async function CoursesPage() {
  const allCourses: Course[] = await getCourses(1, 1000); // fetch everything once on server

  return (
    <div className="space-y-6 pt-20">
      <h1 className="font-semibold text-2xl md:text-[32px] leading-[100%] mb-2">
        Discover
      </h1>
      <p className="font-normal text-[14px] leading-[150%] text-[#818181] mb-4">
        Explore our collection of courses
      </p>

      {/* client-side search / list */}
      <SearchableCourses initialCourses={allCourses} />
    </div>
  );
}
