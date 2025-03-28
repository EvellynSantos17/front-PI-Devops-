import { useEffect, useState } from "react";
import Image from "next/image";
import SelectMultiGrouped from "./select-multi";
import optionsHabilidades from "@/data/habilidades.json";

export default function UserInforCardMult({ title, value, onChange, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(value);
  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onChange(values);
    }
  };
  const handleSelectMultiGrouped = (e) => {
    setValues(e);
  };
  useEffect(() => {
    setValues(value);
  }, [value]);
  return (
    <div className="h-fit flex w-full items-center justify-between p-2 rounded-xl border border-[#00000080] shadow-md">
      <div className="flex flex-col h-full w-full justify-center">
        <h3 className="text-[#32292F8F]">{title}</h3>
        <ul className="flex gap-2 flex-wrap">
          {!isEditing &&
            values.map((item, index) => (
              <li
                key={index}
                className="px-5 py-1 bg-laranjaProdunfo text-white rounded-xl flex items-center justify-between"
              >
                <span>{item.label}</span>
              </li>
            ))}
        </ul>
        {isEditing && (
          <SelectMultiGrouped
            error={null}
            options={optionsHabilidades}
            value={values}
            onChange={handleSelectMultiGrouped}
          />
        )}
      </div>

      {isOwner && (
        <button onClick={() => setIsEditing(!isEditing)}>
          <Image
            alt={isEditing ? "check" : "edit"}
            src={isEditing ? "/icons/check.svg" : "/icons/edit (2).svg"}
            width={29}
            height={26}
          />
        </button>
      )}
    </div>
  );
}
