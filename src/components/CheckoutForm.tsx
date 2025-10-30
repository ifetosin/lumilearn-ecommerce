"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import { validateCheckout, FormState } from "../lib/utils/validation";
import CardIcon from "@/icons/card.svg";
import BankIcon from "@/icons/bank.svg";
import VisaIcon from "@/icons/visa.svg";
import VerveIcon from "@/icons/verve.svg";
import MastercardIcon from "@/icons/mastercard.svg";

type Method = "card" | "bank";

const initialForm: FormState = {
  CardholderName: "",
    email: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  billingAddress: "",

};

export const CheckoutForm: React.FC<{
  onSuccess: () => void;
  onValidityChange?: (valid: boolean) => void;
  submitRef?: React.RefObject<HTMLButtonElement | null>;
}> = ({ onSuccess, onValidityChange, submitRef }) => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [method, setMethod] = useState<Method>("card");
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>(
    Object.keys(initialForm).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as Record<keyof FormState, boolean>
    )
  );
  const [saveForFuture, setSaveForFuture] = useState(false);

  // ✅ Detect card type
  const detectedCardType = useMemo(() => {
    const num = (form.cardNumber || "").replace(/\D/g, "");
    if (/^4/.test(num)) return "Visa";
    if (/^5[1-5]/.test(num)) return "Mastercard";
    if (/^506(0|1)|^5078/.test(num)) return "Verve";
    return null;
  }, [form.cardNumber]);

  const errors = validateCheckout(form, method, detectedCardType);
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  // ✅ Smart input handler with auto-format
  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = e.target.value;

      if (field === "cardNumber") {
        // Auto-format card number: 1234-5678-9012-3456
        value = value
          .replace(/\D/g, "")
          .replace(/(.{4})/g, "$1-")
          .replace(/-$/, "")
          .slice(0, 19);
      }

      if (field === "expiry") {
        // Auto-insert slash after MM -> MM/YY
        value = value
          .replace(/\D/g, "")
          .replace(/^(\d{2})(\d{0,2}).*/, (_, m, y) =>
            y ? `${m}/${y}` : m
          )
          .slice(0, 5);
      }

      if (field === "cvv") value = value.replace(/\D/g, "").slice(0, 4);

      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleBlur = (field: keyof FormState) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const internalSubmitRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (submitRef) submitRef.current = internalSubmitRef.current;
  }, [submitRef]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isValid) {
      onSuccess();
      setForm(initialForm);
      setTouched(
        Object.keys(initialForm).reduce(
          (a, k) => ({ ...a, [k]: false }),
          {} as Record<keyof FormState, boolean>
        )
      );
      setSaveForFuture(false);
    } else {
      setTouched(
        Object.keys(initialForm).reduce(
          (a, k) => ({ ...a, [k]: true }),
          {} as Record<keyof FormState, boolean>
        )
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-4" aria-label="Checkout form">
      <h3 className="text-2xl font-medium mb-3">Payment Method</h3>

      {/* Info banner */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#F0F5FF] rounded-lg">
        <ShieldCheck className="w-9 h-7" aria-hidden />
        <p className="text-[#4F4F4F] text-sm">
          Payments are encrypted so that your credit card and payment details stay safe.
        </p>
      </div>

      <fieldset className="space-y-3" aria-label="Payment method">
        {(["card", "bank"] as Method[]).map((opt) => {
          const active = method === opt;
          return (
            <label
              key={opt}
              className={`block p-4 border rounded-2xl transition cursor-pointer ${
                active ? "ring-1 ring-green-200 bg-green-50" : "border-gray-200 bg-white"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between" onClick={() => setMethod(opt)}>
                <div className="flex items-center gap-3">
                  {opt === "card" ? <CardIcon /> : <BankIcon />}
                  <span className="text-sm font-medium capitalize">
                    {opt === "card" ? "Credit / Debit Card Payment" : "Bank Transfer"}
                  </span>
                     <div className="flex items-center gap-2 mt-2">
                      <div
                        className={`p-1 rounded ${
                          detectedCardType === "Visa" ? "ring-2 ring-green-500" : "opacity-50"
                        }`}
                      >
                        <VisaIcon />
                      </div>
                      <div
                        className={`p-1 rounded ${
                          detectedCardType === "Verve" ? "ring-2 ring-green-500" : "opacity-50"
                        }`}
                      >
                        <VerveIcon />
                      </div>
                      <div
                        className={`p-1 rounded ${
                          detectedCardType === "Mastercard" ? "ring-2 ring-green-500" : "opacity-50"
                        }`}
                      >
                        <MastercardIcon />
                      </div>
                    </div>
                </div>
                <input
                  type="radio"
                  name="payment-method"
                  checked={active}
                  onChange={() => setMethod(opt)}
                  className="accent-green-600 w-4 h-4"
                />
              </div>

              {/* Card option */}
              {opt === "card" && active && (
                <div className="mt-4 space-y-4">
                 
                  <InputField
                    label="Cardholder Name"
                    name="CardholderName"
                    value={form.CardholderName}
                    onChange={handleChange("CardholderName")}
                    onBlur={() => handleBlur("CardholderName")}
                    placeholder="Enter name on card"
                    error={touched.CardholderName ? errors.CardholderName : undefined}
                  />

                  <div>
                     <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    onBlur={() => handleBlur("email")}
                    placeholder="you@example.com"
                    error={touched.email ? errors.email : undefined}
                  />

                  </div>

                  <div>
                    <InputField
                      label={`Card Number ${detectedCardType ? `(${detectedCardType})` : ""}`}
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange("cardNumber")}
                      onBlur={() => handleBlur("cardNumber")}
                      placeholder="1234-5678-9012-3456"
                      error={touched.cardNumber ? errors.cardNumber : undefined}
                      inputMode="numeric"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Expiry (MM/YY)"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange("expiry")}
                      onBlur={() => handleBlur("expiry")}
                      placeholder="MM/YY"
                      error={touched.expiry ? errors.expiry : undefined}
                      inputMode="numeric"
                    />
                    <InputField
                      label="CVV"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange("cvv")}
                      onBlur={() => handleBlur("cvv")}
                      placeholder="123"
                      error={touched.cvv ? errors.cvv : undefined}
                      inputMode="numeric"
                    />
                  </div>

                  <TextareaField
                    label="Billing Address"
                    name="billingAddress"
                    value={form.billingAddress}
                    onChange={handleChange("billingAddress")}
                    onBlur={() => handleBlur("billingAddress")}
                    placeholder="Enter your billing address"
                    error={touched.billingAddress ? errors.billingAddress : undefined}
                  />

                  <div className="flex items-center gap-3">
                    <input
                      id="save-card"
                      type="checkbox"
                      checked={saveForFuture}
                      onChange={(e) => setSaveForFuture(e.target.checked)}
                      className="w-4 h-4 accent-green-600"
                    />
                    <label htmlFor="save-card" className="text-sm text-gray-700 select-none">
                      Save card for future payments
                    </label>
                  </div>
                </div>
              )}

              {/* Bank Transfer option */}
              {opt === "bank" && active && (
                <div className="mt-4 space-y-4">
                  <div className="text-sm text-gray-700 mb-1">
                    <p><strong>Bank:</strong> Example Bank</p>
                    <p><strong>Account Number:</strong> 0123456789</p>
                    <p><strong>Account Name:</strong> Lumilearn Ltd</p>
                  </div>

                  <InputField
                    label="Full Name"
                    name="CardholderName"
                    value={form.CardholderName}
                    onChange={handleChange("CardholderName")}
                    onBlur={() => handleBlur("CardholderName")}
                    placeholder="Enter your full name"
                    error={touched.CardholderName ? errors.CardholderName : undefined}
                  />

                  <TextareaField
                    label="Billing Address"
                    name="billingAddress"
                    value={form.billingAddress}
                    onChange={handleChange("billingAddress")}
                    onBlur={() => handleBlur("billingAddress")}
                    placeholder="Enter your billing address"
                    error={touched.billingAddress ? errors.billingAddress : undefined}
                  />
                </div>
              )}
            </label>
          );
        })}
      </fieldset>

      {/* hidden submit */}
      <button ref={internalSubmitRef} type="submit" className="hidden" aria-hidden />
    </form>
  );
};
