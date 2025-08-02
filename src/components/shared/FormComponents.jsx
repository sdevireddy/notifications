export const Section = ({ title, icon, children }) => (
    <div className="mb-4 rounded border p-4">
        <h3 className="mb-4 flex items-center gap-2 border-b pb-1 text-lg font-semibold">
            {icon} {title}
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">{children}</div>
    </div>
);

export const Input = ({ label, name, type = "text", value, onChange, required = false, className = "" }) => (
    <div className={className}>
        <label
            htmlFor={name}
            className="block text-gray-700"
        >
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full rounded border-blue-400 p-2 border-[1px]"
        />
    </div>
);

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
