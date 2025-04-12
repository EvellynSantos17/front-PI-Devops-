"use client";

export function InputField({
  label,
  required,
  inputStyle = "login",
  name,
  error,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
}) {
  const style = {
    login:
      "border border-b-4 p-2 rounded-3xl w-full border-[#D9D9D9] shadow-md mt-1",
    form: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm",
  };

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        className={style[inputStyle]}
        placeholder={placeholder}
        required={required}
        name={name}
        id={name}
        type={type}
        {...(onChange
          ? { onChange: (event) => onChange(event.target.value) }
          : {})}
        {...(value !== undefined ? { value } : {})}
        {...(onBlur ? { onBlur } : {})}
        {...(value ? { value } : {})}
      />
      <p
        className={`text-sm text-red-500 transition-opacity duration-150 px-2 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error ? error : "."}
      </p>
    </div>
  );
}
