"use client";

export function BaseSelectOne({ label, inputStyle = "form", name, error, onChange, onBlur, options = [] }) {

    const style = {
        form: 'mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
    }
        
    return (
        <div>
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select 
              className={style[inputStyle]} 
              name={name} 
              defaultValue="" 
              {...onChange ? {onChange: (event) => onChange(event.target.value) } : {}}
            >
                <option disabled value="">Selecionar...</option>
                {
                    options.map((option, index) => (
                        <option key={index} className="text-black" value={option.value}>
                            {option.name}
                        </option>
                    ))
                }
            </select>
            <p className={`text-sm text-red-500 transition-opacity duration-150 px-2 ${error ? 'opacity-100' : 'opacity-0'}`}>{error ? error : '.'}</p>
        </div>
    );
    
}