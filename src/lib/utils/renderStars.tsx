   import { Star } from "lucide-react";
   
   export const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => {
      const index = i + 1;
      const filled = rating >= index;
      const partial = rating > i && rating < index;
      return (
        <Star
          key={index}
          size={16}
          className={`${
            filled || partial
              ? "fill-[#ED9D2C] text-[#ED9D2C]"
              : "text-transparent stroke-[#ED9D2C]"
          }`}
        />
      );
    });