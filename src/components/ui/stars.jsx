"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function Stars({
  numberStar = 1,
  click = true,
  onClick = null,
  size = 10,
}) {
  const [correntNumberStar, setCorrentNumberStart] = useState(1);
  useEffect(() => {
    setCorrentNumberStart(numberStar);
  }, [numberStar]);
  const stars = [0, 1, 2, 3, 4];
  const starEmpty = "/icons/star-empty.svg";
  const starFill = "/icons/star-fill.svg";

  function handleClick(number) {
    if (!click) return;
    setCorrentNumberStart(number);
    if (onClick) onClick(number);
  }

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        return (
          <button
            disabled={!click}
            onClick={() => handleClick(star + 1)}
            key={star}
          >
            <Image
              alt="d"
              src={star < correntNumberStar ? starEmpty : starFill}
              width={size}
              height={size}
            />
          </button>
        );
      })}
    </div>
  );
}
