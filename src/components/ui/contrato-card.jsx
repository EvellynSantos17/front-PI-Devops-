"use client";

import Image from "next/image";

export default function StatusComponent({ statusCard }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "CONTRACTED":
        return {
          bgClass: "bg-[#FEF9C3] text-[#974D0E]",
          iconSrc: "/icons/clock.png",
          iconAlt: "clock",
          text: "Pendente de aceitação",
        };
      case "STARTED":
        return {
          bgClass: "bg-[#DBEAFE] text-[#3156C0]",
          iconSrc: "/icons/correct.png",
          iconAlt: "correct",
          text: "Aceito pelo prestador",
        };
      case "FINISHED":
        return {
          bgClass: "bg-[#DCFCE7] text-[#166534]",
          iconSrc: "/icons/checkcircle.png",
          iconAlt: "check",
          text: "Finalizado pelo prestador",
        };
      case "ACCEPTED":
        return {
          bgClass: "bg-[#DBEAFE] text-[#3156C0]",
          iconSrc: "/icons/correct.png",
          iconAlt: "correct",
          text: "Aceito pelo cliente",
        };
      case "CANCELLED":
        return {
          bgClass: "bg-[#FEE2E2] text-[#AC2823]",
          iconSrc: "/icons/cancel.png",
          iconAlt: "cancel",
          text: "Cancelado",
        };
      default:
        return {
          bgClass: "bg-[#FFFFFF] text-[#000000]",
          iconSrc: "/icons/clock.png",
          iconAlt: "clock",
          text: "Status desconhecido",
        };
    }
  };

  const { bgClass, iconSrc, iconAlt, text } = getStatusStyles(statusCard);

  return (
    <div
      className={`flex border shadow-md h-fit rounded-3xl px-5 p-1 gap-1 mt-4 ${bgClass}`}
    >
      <Image
        className="w-[20px] h-[20px]"
        alt={iconAlt}
        src={iconSrc}
        width={20}
        height={20}
      />
      <span className="h-fit">{text}</span>
    </div>
  );
}
