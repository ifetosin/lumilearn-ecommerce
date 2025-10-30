// components/CartItem.tsx
"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Course } from "@/types/courses";
import { useCart } from "@/context/CartContext";
import { Tv, Clock } from "lucide-react";
import { renderStars } from "@/lib/utils/renderStars";

interface CartItemProps {
  course: Course;
  index: number;
  isLast: boolean;
}

export default function CartItem({ course, index, isLast }: CartItemProps) {
  const { removeFromCart } = useCart();

  const formatNaira = (amount: number) =>
    `₦${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;



  return (
    <div
      className={`p-4 flex gap-4 hover:border-gray-300 transition-colors ${
        !isLast ? "border-b border-gray-200" : ""
      }`}
    >
      {/* Image */}
      <div className="relative w-32 h-20 shrink-0 rounded-lg overflow-hidden">
        <Image
          src={course.cover_image_url}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
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


          <p className="text-xs font-normal leading-[18px] tracking-[-0.2px] text-[#818181] mb-5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <Tv size={14} /> Live
            </span>
            <span>|</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} /> {course.duration} {course.duration_type}
            </span>
          </p>


          <div className="mt-5 flex justify-between items-center mb-5">
            <span className="text-base font-semibold leading-[18px] tracking-[-0.2px] text-[#181A25]">
              ₦{course.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(course.slug)}
          className="text-[#636363] hover:text-red-700 transition-colors p-2"
          aria-label="Remove from cart"
        >
          <Trash2 size={20} />
        </button>
       
      </div>
    </div>
  );
}
