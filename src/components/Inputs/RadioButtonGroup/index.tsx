type RadioButtonGroup = {
  name: string;
  options: string[];
  selected: string;
  onChange?: (value: RadioButtonGroup["selected"]) => void;
};

const RadioButtonGroup = ({
  options,
  selected,
  onChange,
  name,
}: RadioButtonGroup) => {
  return (
    <div className="flex flex-col gap-1 py-2">
      {options.map((option) => (
        <div key={option} className="relative flex items-center cursor-pointer">
          <label
            htmlFor={`radio-${name}-${option}`}
            className="peer"
            onClick={() => onChange?.(option)} // Explicit onClick
          >
            <input
              type="radio"
              id={`radio-${name}-${option}`}
              className="sr-only"
              value={option}
              checked={selected === option}
              name={name}
            />

          </label>
            <div className="w-6 h-6 rounded-full border border-gray-500 peer-has-checked:border-blue-900 peer-has-checked:after:content-[''] peer-has-checked:after:absolute peer-has-checked:after:top-0.5 peer-has-checked:after:left-0.5 peer-has-checked:after:bg-blue-500 peer-has-checked:after:rounded-full peer-has-checked:after:w-5 peer-has-checked:after:h-5"></div>
            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500">
              {option}
              </span>
        </div>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
