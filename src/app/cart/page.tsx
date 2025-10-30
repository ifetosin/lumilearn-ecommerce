"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { ArrowRight } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, ready } = useCart();

  // While cart is not ready (hydration), show a neutral placeholder
  if (!ready) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <h1 className="font-semibold text-2xl md:text-[32px] leading-[100%] mb-2">
            Cart
          </h1>
          <p className="font-normal text-[14px] leading-[150%] text-[#818181]">
            Access courses and tutors you have liked
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-lg py-6 px-2">
          {/* Left placeholder */}
          <div className="w-full md:w-[60%] 2xl:w-[70%]  space-y-4">
            <div className="h-6 w-40 bg-gray-100 rounded animate-pulse" />
            <div className="p-12 text-center">
              <p className="text-gray-400">Loading cart…</p>
            </div>
          </div>

          {/* Right placeholder */}
          <div className="w-full md:w-[40%] 2xl:w-[30%] ">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-[#181A25] mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
                <div className="h-6 bg-gray-100 rounded w-full animate-pulse" />
              </div>
              <div className="h-10 bg-gray-100 rounded w-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Once ready, render real cart
  const subtotal = cart.reduce((sum, course) => sum + course.price, 0);
  const total = subtotal;
  const formatNaira = (amount: number) =>
    `₦${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-semibold text-2xl md:text-[32px] leading-[100%] mb-3">
          Cart
        </h1>
        <p className="font-normal text-[14px] leading-[150%] text-[#818181]">
          Access courses and tutors you have liked
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-lg py-6 px-2">
        {/* Left Column */}
        <div className="lg:w-[60%]">
          <p className="text-[#4F4F4F] px-6">
            {cart.length} {cart.length === 1 ? "course" : "courses"} in cart
          </p>

          {cart.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[#4F4F4F] text-lg mb-4">Your cart is empty</p>
              <Link href="/" className="text-[#8fc1a0] hover:underline">
                Browse courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((course, index) => (
                <CartItem
                  key={course.slug}
                  course={course}
                  index={index}
                  isLast={index === cart.length - 1}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:w-[40%]">
          <div className="bg-white rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-[#181A25] mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-[#4F4F4F] text-sm">
                <span>
                  {cart.length} {cart.length === 1 ? "course" : "courses"}
                </span>
                <span>{formatNaira(subtotal)}</span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-sm font-bold text-[#181A25]">
                  <span>Total</span>
                  <span>{formatNaira(total)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                disabled={cart.length === 0}
                onClick={() => router.push("/cart/checkout")}
                className="flex items-center justify-center gap-2 flex-1 py-3 rounded-2xl font-medium text-white text-center transition-transform duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-300 hover:scale-105"
                style={{
                  background:
                    cart.length === 0
                      ? "#D1D5DB"
                      : "linear-gradient(3.06deg, #1C9647 26.39%, #76F1A2 157.92%)",
                }}
              >
                Proceed to Checkout
                <ArrowRight size={18} className="ml-1" />
              </button>


              {cart.length === 0 && (
                <span className="ml-4 text-red-500 text-sm font-medium">
                  Add a course to proceed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
