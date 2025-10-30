export type PaymentMethod = "card" | "bank";

export interface FormState {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  billingAddress: string;
}

export interface ValidationErrors {
  fullName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  billingAddress?: string;
}

export type FormField = keyof FormState;

export interface CardPatterns {
  visa: RegExp;
  mastercard: RegExp;
  amex: RegExp;
}

export interface ValidationConfig {
  cardPatterns: CardPatterns;
}