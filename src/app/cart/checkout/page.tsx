"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CheckoutForm } from "@/components/CheckoutForm";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const formattedTotal = `₦${subtotal
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  const handleProceed = () => {
    if (cart.length === 0) return;

    if (submitRef.current) {
      submitRef.current.click();
    } else {
      const formElement = document.querySelector(
        "form[aria-label='Checkout form']"
      );
      if (formElement) {
        (formElement as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    setShowSuccess(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-2 md:px-4 py-8 pt-12 md:pt-20">
      <p className="text-sm text-[#4F4F4F]">
        Cart <span className="text-gray-500">/ Checkout</span>
      </p>

      <h1 className="text-2xl font-semibold mb-6 mt-2">Checkout</h1>

      <section className="flex flex-col lg:flex-row gap-8 bg-white rounded-lg py-6 px-2">
        <div className="w-full md:w-[60%] 2xl:w-[70%] ">
          <CheckoutForm
            onSuccess={handlePaymentSuccess}
            onValidityChange={setIsFormValid}
            submitRef={submitRef}
          />
        </div>

        <aside className="w-full md:w-[40%] 2xl:w-[30%] p-6 sticky top-24 h-fit bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between text-lg font-bold mt-2 mb-4">
            <span>Total</span>
            <span>{formattedTotal}</span>
          </div>

          {cart.length === 0 ? (
            <div className="rounded-lg border border-gray-100 p-4 text-center text-gray-600">
              <p className="mb-2">Your cart is empty</p>
              <Link
                href="/"
                className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition"
              >
                Browse courses
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={handleProceed}
                disabled={!isFormValid}
                aria-disabled={!isFormValid}
                className={`w-full py-3 rounded-full font-medium text-white transition-transform duration-150 ${
                  isFormValid
                    ? "bg-linear-to-r from-[#1C9647] to-[#29c35f] hover:scale-[1.02]"
                    : "bg-[#1C9647]/90 cursor-not-allowed pointer-events-none"
                }`}
                style={
                  !isFormValid ? { filter: "blur(1px)", opacity: 0.62 } : {}
                }
              >
                Pay {formattedTotal}
              </button>

              <p className="text-xs mt-3 leading-tight text-center text-[#4F4F4F]">
                By clicking the pay button and completing this purchase, you
                agree to
                <span className="ml-1 font-medium">Lumilearn’s</span>{" "}
                <Link
                  href="#"
                  className="font-medium text-[#1C9647] underline decoration-[#1C9647] hover:text-[#0E7A3F] active:text-[#0B5E31] focus:outline-none focus:ring-2 focus:ring-[#76F1A2] focus:ring-offset-1"
                  title="Read Terms and Conditions"
                  rel="noopener noreferrer"
                >
                  Terms & Conditions
                </Link>{" "}
                <span className="mx-1">and</span>
                <Link
                  href="#"
                  className="font-medium text-[#1C9647] underline decoration-[#1C9647] hover:text-[#0E7A3F] active:text-[#0B5E31] focus:outline-none focus:ring-2 focus:ring-[#76F1A2] focus:ring-offset-1"
                  title="Read Refund Policy"
                  rel="noopener noreferrer"
                >
                  Refund Policy
                </Link>
                .
              </p>
            </>
          )}
        </aside>
      </section>

      {showSuccess && (
        <Modal
          imageSrc="/success.svg"
          title="Payment Successful"
          description="Payment confirmation has been sent to your email. You can view your payment receipt in the transaction history."
          buttonText="Proceed to Dashboard"
          onClose={() => {
            setShowSuccess(false);
            router.push("/");
          }}
        />
      )}
    </main>
  );
}
