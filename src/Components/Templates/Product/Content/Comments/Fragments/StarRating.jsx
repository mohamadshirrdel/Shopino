import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState();

  return (
    <div className="flex items-center gap-1" dir="ltr">
      {[1, 2, 3, 4, 5].map((star, index) => {
        const isFilled = star <= (hoverValue || value);

        return (
          <button
            key={index}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            className="text-xl transition-colors"
            type="button"
          >
            <FaStar
              className={isFilled ? "text-amber-200" : "text-slate-200"}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
