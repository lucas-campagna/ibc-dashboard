type checkboxInputProps = {
  label?: string;
  checked?: boolean;
  onChange?: (checked: checkboxInputProps["checked"]) => void;
};

const Checkbox = ({ label, checked, onChange }: checkboxInputProps) => {
  return (
    <div className="flex flex-col">
      {label ? (
        <label htmlFor={`checkbox-${label}`} className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : null}
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id={`checkbox-${label}`}
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
      </div>
    </div>
  );
};

export default Checkbox;