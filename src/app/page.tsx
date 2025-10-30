// app/page.tsx
import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/api/courses";
import { Course } from "../types/courses";
import { Search } from "lucide-react";

interface PageProps {
  searchParams?: { query?: string; page?: string };
}


export default async function CoursesPage({ searchParams }: PageProps) {
  const query = searchParams?.query || "";
  const page = parseInt(searchParams?.page || "1", 10);
  const limit = 12; // Adjust for more courses later

  // Fetch all courses (for filtering)
  const allCourses: Course[] = await getCourses(1, 100); // fetch all for search

  // Filter based on query
  const filteredCourses = query
    ? allCourses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      )
    : allCourses;

  // Slice for pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const courses = filteredCourses.slice(start, end);

  const hasNextPage = end < filteredCourses.length;
  const hasPreviousPage = page > 1;

  return (
    <div className="space-y-6 pt-20">
      <h1 className="font-semibold text-2xl md:text-[32px] leading-[100%] mb-2">
        Discover
      </h1>
      <p className="font-normal text-[14px] leading-[150%] text-[#818181] mb-4">
        Explore our collection of courses
      </p>

      {/* Search Form */}
      <form className="w-full max-w-xs mb-6" method="get">
        <div className="flex items-center gap-3 h-[35px] px-3 border border-gray-300 rounded-2xl bg-white">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            name="query"
            defaultValue={query}
            placeholder="Search courses..."
            className="w-full outline-none text-[12px] font-normal leading-[100%] text-[#181A25]"
          />
          <button type="submit" className="sr-only">
            Search
          </button>
        </div>
      </form>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <a
          href={`?query=${query}&page=${page - 1}`}
          className={`px-3 py-1 border rounded text-sm ${
            hasPreviousPage
              ? "text-gray-700 hover:bg-gray-100"
              : "text-gray-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          Previous
        </a>

        <span className="px-3 py-1 border rounded text-sm bg-gray-200 text-gray-800">
          {page}
        </span>

        <a
          href={`?query=${query}&page=${page + 1}`}
          className={`px-3 py-1 border rounded text-sm ${
            hasNextPage
              ? "text-gray-700 hover:bg-gray-100"
              : "text-gray-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          Next
        </a>
      </div>
    </div>
  );
}
