"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Tv, Clock, User, Star } from "lucide-react";
import { Course } from "@/types/courses";
import { renderStars } from "@/lib/utils/renderStars";

export default function CourseCard({ course }: { course: Course }) {
  const { addToCart, isInCart, ready } = useCart();

  return (
    <div className="bg-white shadow-2xs rounded-lg overflow-hidden flex flex-col font-sans border-[#D9D9D9] border">
      <Image
        src={course.cover_image_url}
        alt={course.title}
        width={400}
        height={145}
        className="object-cover w-full h-[145px]"
        priority
      />

      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="font-medium text-base leading-[100%] mb-3">
            {course.title}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <Image
              src={course.tutor.avatar}
              alt={course.tutor.name}
              width={24}
              height={24}
              className="rounded-2xl"
            />
            <p className="text-xs font-medium text-[#4F4F4F]">
              {course.tutor.name}
            </p>
          </div>

          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs">{course.rating.toFixed(1)}</span>
            <div className="flex gap-0.5">{renderStars(course.rating)}</div>
          </div>

          <div className="mt-5 flex justify-between items-center mb-5">
            <span className="text-base font-semibold leading-[18px] tracking-[-0.2px] text-[#181A25]">
              ₦{course.price.toLocaleString()}
            </span>
          </div>

          <p className="text-xs font-normal leading-[18px] tracking-[-0.2px] text-[#818181] mb-5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <Tv size={14} /> Live
            </span>
            <span>|</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} /> {course.duration} {course.duration_type}
            </span>
            <span>|</span>
            <span className="inline-flex items-center gap-1">
              <User size={14} /> Grade 4 & 3 others
            </span>
          </p>
        </div>

        <button
          onClick={() => addToCart(course)}
          disabled={!ready || isInCart(course.slug)}
          className={`inline-block min-w-[94px] max-w-max px-4 py-2 rounded-3xl border text-center ${
            !ready
              ? "border-gray-300 text-gray-400 cursor-wait"
              : isInCart(course.slug)
              ? "border-gray-300 text-gray-500 cursor-not-allowed"
              : "border-green-500 text-green-600 hover:bg-green-50"
          } text-[14px] font-medium leading-[150%]`}
        >
          {!ready
            ? "Loading..."
            : isInCart(course.slug)
            ? "In Cart"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
