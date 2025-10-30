// lib/api/courses.ts
import { Course } from "../../types/courses";

export async function getCourses(page = 1, limit = 12): Promise<Course[]> {
  const response = await fetch(
    "https://lumilearn.s3.us-east-1.amazonaws.com/dump/courses.json",
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);

  const data = await response.json();
  if (!Array.isArray(data)) return [];

  const start = (page - 1) * limit;
  const end = start + limit;
  return data.slice(start, end) as Course[];
}
