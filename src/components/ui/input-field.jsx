"use client";

export function InputField({ label, required, name, error, type = "text", value, onChange, onBlur, placeholder }) {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <input 
                className="border border-b-4 p-2 rounded-3xl w-full border-[#D9D9D9] shadow-md mt-1" 
                placeholder={placeholder}
                required={required}
                name={name} 
                id={name} 
                type={type}
                {...onChange ? {onChange: (event) => onChange(event.target.value) } : {}}
                {...(value !== undefined ? { value}  : {})}
                {...onBlur ? {onBlur} : {}} 
                {...value ? {value} : {}}

            />
            <p className={`text-sm text-red-500 transition-opacity duration-150 px-2 ${error ? 'opacity-100' : 'opacity-0'}`}>{error ? error : '.'}</p>
        </div>
    );
    
}
