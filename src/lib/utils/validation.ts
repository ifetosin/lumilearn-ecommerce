export interface FormState {
  CardholderName: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  billingAddress: string;
}

export const detectCardType = (num: string): "Visa" | "Mastercard" | "Verve" | null => {
  const clean = num.replace(/\D/g, "");

  if (/^4/.test(clean)) return "Visa";
  if (/^5[1-5]/.test(clean)) return "Mastercard";
  if (/^(5060|5061|5078|6500|6501)/.test(clean)) return "Verve";
  return null;
};

export const validateCheckout = (
  form: FormState,
  method: "card" | "bank",
  detectedCardType: string | null
) => {
  const errors: Record<string, string> = {};

  if (!form.CardholderName.trim() || form.CardholderName.trim().split(" ").length < 2) {
    errors.CardholderName = "Please enter your full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (method === "card") {
    const digits = form.cardNumber.replace(/[-\s]/g, "");
    if (!/^\d{16}$/.test(digits)) {
      errors.cardNumber = "Card number must be 16 digits.";
    } else if (!detectedCardType) {
      errors.cardNumber = "Please enter a valid card number (card type not detected).";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
      errors.expiry = "Please enter a valid expiry date (MM/YY).";
    } else {
      const [mm, yy] = form.expiry.split("/").map(Number);
      const now = new Date();
      const expiryDate = new Date(2000 + yy, mm);
      if (expiryDate < now) errors.expiry = "Card has expired.";
    }

    if (!/^\d{3}$/.test(form.cvv)) {
      errors.cvv = "Please enter a valid 3-digit CVV.";
    }
  }

  if (!form.billingAddress.trim()) {
    errors.billingAddress = "Billing address is required.";
  }

  return errors;
};
