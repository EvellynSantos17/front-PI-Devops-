import Image from "next/image";
import Link from "next/link";

export default function CardService({
  id = 0,
  title,
  location,
  type,
  created_at,
  orange = true,
  has_button = false,
}) {
  const iconColor = orange
    ? "/icons/workflowOrange.svg"
    : "/icons/workflowBlack.svg";
  const inconTimeColor = orange
    ? "/icons/TimeCircle.svg"
    : "/icons/TimeCircleBlack.svg";
  const url = `servico/${id}`;
  return (
    <Link
      href={url}
      className={`p-2 rounded-xl border bg-white min-w-[400px] h-fit flex gap-2 items-center shadow-md hover:bg-zinc-100  hover:shadow-lg ${
        orange == false ? "border-[#686868]" : "border-laranjaProdunfo"
      }`}
    >
      <Image src={iconColor} alt="workflowOrange" width={101} height={139} />

      <div className="flex flex-col w-full">
        <h2 className="font-bold">{title}</h2>

        <div className="flex items-center gap-2 text-[#686868]">
          <Image
            src={"/icons/Location.svg"}
            alt="Location"
            width={18}
            height={18}
          />

          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2 text-[#686868]">
          <Image
            src={"/icons/ShareAlt.svg"}
            alt="type"
            width={18}
            height={18}
          />

          <span>{type}</span>
        </div>

        <div
          className={`flex items-center gap-2 ${
            orange == false ? "text-[#686868]" : "text-laranjaProdunfo"
          }`}
        >
          <Image src={inconTimeColor} alt="time" width={18} height={18} />

          <span>{created_at}</span>
        </div>

        {has_button ? (
          <button
            className={`flex items-center gap-2 w-full justify-center py-1 text-white rounded-lg ${
              orange == false ? "bg-[#686868]" : "bg-laranjaProdunfo"
            }`}
          >
            <Image src={"/icons/edit.svg"} alt="" width={18} height={16} />
            <span>Editar anúncio</span>
          </button>
        ) : null}
      </div>
    </Link>
  );
}
