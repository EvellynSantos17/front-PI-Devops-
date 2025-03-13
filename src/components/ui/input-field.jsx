"use client";

export function InputField({ label, required, name, error, type = "text", value, onChange, onBlur }) {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <input 
                className="border p-2 rounded-md" 
                required={required}
                name={name} 
                id={name} 
                type={type}
                {...onChange ? {onChange: (event) => onChange(event.target.value) } : {}}
                {...(value !== undefined ? { value}  : {})}
                {...onBlur ? {onBlur} : {}} 
                {...value ? {value} : {}}

            />
            <p className="text-sm text-red-500">{error ? error : '.'}</p>
        </div>
    );
    
}
