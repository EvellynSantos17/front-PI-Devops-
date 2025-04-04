
"use client";
import { useState } from "react";
import Image from "next/image";

export default function UserInforCard({ title, value, onChange,isOwner = false }) {
    const [isEditing, setIsEditing] = useState(isOwner);
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="h-fit flex w-full items-center justify-between p-2 rounded-xl border border-[#00000080] shadow-md">
            <div className="flex flex-col h-full w-full justify-center">
                <h3 className="text-[#32292F8F]">{title}</h3>
                {isOwner ? (
                    <textarea
                        className="bg-transparent resize border border-gray-300 rounded p-1"
                        name={title}
                        value={inputValue}
                        onChange={handleChange}
                    />
                ) : (
                    <p className="bg-transparent p-1">{inputValue}</p>
                )}
            </div>
            
        </div>
    );
}