export const Select = ({ label, name, value, onChange, options = [], required = false }) => (
    <div>
        <label
            htmlFor={name}
            className="block text-gray-700"
        >
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full rounded border-[1px] border-blue-400 p-2"
        >
            <option value="">Select {label}</option>
            {options.map((opt) => (
                <option
                    key={opt}
                    value={opt}
                >
                    {opt}
                </option>
            ))}
        </select>
    </div>
);