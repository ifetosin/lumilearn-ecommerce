"use client";

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Course } from "@/types/courses";
import CourseCard from "@/components/CourseCard";

export default function SearchableCourses({
  initialCourses,
}: {
  initialCourses: Course[];
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? initialCourses.filter((c) => c.title.toLowerCase().includes(q))
      : initialCourses;
  }, [initialCourses, query]);

  const start = (page - 1) * limit;
  const end = start + limit;
  const pageItems = filtered.slice(start, end);
  const hasNextPage = end < filtered.length;
  const hasPreviousPage = page > 1;

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
  }

  return (
    <>
      <form className="w-full max-w-xs mb-6" onSubmit={onSearchSubmit}>
        <div className="flex items-center gap-3 h-[35px] px-3 border border-gray-300 rounded-2xl bg-white">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full outline-none text-[12px] font-normal leading-[100%] text-[#181A25]"
          />
          <button type="submit" className="sr-only">
            Search
          </button>
        </div>
      </form>
      <div className="grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {pageItems.map((course) => (
          <div key={course.slug} className="max-w-[320px] w-full">
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={!hasPreviousPage}
          className={`px-3 py-1 border rounded text-sm ${
            hasPreviousPage
              ? "text-gray-700 hover:bg-gray-100"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        <span className="px-3 py-1 border rounded text-sm bg-gray-200 text-gray-800">
          {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNextPage}
          className={`px-3 py-1 border rounded text-sm ${
            hasNextPage
              ? "text-gray-700 hover:bg-gray-100"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}
