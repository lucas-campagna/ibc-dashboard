type NumberProps = {
  label?: string;
  value: number;
  onChange?: (value: NumberProps["value"]) => void;
};

const Number = ({ label, value, onChange }: NumberProps) => (
  <div className="flex flex-col">
    {label ? (
      <label
        htmlFor={`input-${label}`}
        className="mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    ) : (
      <></>
    )}
    <input
      type="number"
      id={`input-${label}`}
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange?.(+e.target.value)}
      className="w-24 p-2 bg-white border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    />
  </div>
);

export default Number;
