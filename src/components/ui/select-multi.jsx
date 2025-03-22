"use client";

import { useIsMounted } from "@/hooks/useIs-mounted-hook";
import Select from "react-select";

export default function SelectMultiGrouped({label, error, options, onChange, value}) {
    const isMounted = useIsMounted(); 

    if (!isMounted) return null; 

  return (
    <div>
        {label && (
          <label className="text-sm font-medium text-gray-700">
              {label}
          </label>
        )}
        <Select
            isMulti
            name="habilidades"
            placeholder="Digite uma habilidade"
            options={options}
            value={value}
            className="mt-1 block w-full"
            onChange={(e) => onChange(e)}
            styles={{
                control: (base, state) => ({
                    ...base,
                    width: "100%",
                    padding: "4px 8px",
                    backgroundColor: "transparent",
                    borderRadius: "6px",
                    border: "0.3px solid #D1D5DB",
                    fontSize: "0.875rem",
                    outline: state.isFocused ? "1px solid #F97316" : "none",
                    borderColor: "#D1D5DB",
                    "&:hover": {
                        borderColor: "#D1D5DB",
                        },
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#F97316",
                    borderRadius: "20px",
                    padding: "2px 8px",
                    marginRight: "5px",
                }),
                multiValueLabel: (base) => ({
                    ...base,
                    color: "white",
                    fontWeight: "bold",
                }),
                multiValueRemove: (base) => ({
                    ...base,
                    color: "white",
                    ":hover": {
                        backgroundColor: "transparent",
                    },
                }),
            }}
        />

        <p className={`text-sm text-red-500 transition-opacity duration-150 px-2 ${error ? 'opacity-100' : 'opacity-0'}`}>
            {error ? error : '.'}
        </p>
    </div>
  );
}
