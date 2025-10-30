### README — Lumilearn E-commerce (Short)

A minimal Next.js + TypeScript demo for selling courses with a client-side cart (localStorage), hydration-safe cart → checkout flow, validated client-only checkout (Card / Bank Transfer), and a success modal.

### Tech
- Next.js (App Router) + React (client components)  
- TypeScript, Tailwind CSS, lucide-react icons

### Quick start
1. Clone repo and install:
   npm install
2. Run dev:
   npm run dev
3. Open http://localhost:3000

### Key files
- src/context/CartContext.tsx — cart + ready flag (localStorage)
- src/app/cart/page.tsx — cart page (skeleton while hydrating)  
- src/app/checkout/page.tsx — checkout page (form left, order summary right)  
- src/components/CheckoutForm.tsx — client validation, card detection, collapsible payment methods  
- src/components/CartItem.tsx, Modal.tsx — UI pieces

### Notes — Hydration
- CartContext loads localStorage in useEffect and sets ready = true; pages show a neutral skeleton until ready to avoid "0 items" flash and hydration errors.
- Navigate with router.push("/checkout") for a clean client transition.

### Validation summary (client-side)
- Full Name: required, ≥2 words
- Email: valid format
- Card Number: 16 digits; detect Visa/MasterCard/Amex
- Expiry: MM/YY, future date
- CVV: 3 digits (4 for Amex)
- Billing Address: required
- Inline errors, real-time feedback, submit disabled until valid

