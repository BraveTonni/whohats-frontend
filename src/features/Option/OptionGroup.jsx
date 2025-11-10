import OptionButton from "./OptionButton";

import { useStorage } from "../../hooks/useStorage";

export default function OptionGroup({ groupName, options, label }) {
  const [selected, setSelected] = useStorage(groupName, options[0].value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className={groupName.includes("age") ? "grid gap-2" : "flex gap-2"}>
        {options.map(({ value, label }) => (
          <OptionButton
            key={value}
            isSelected={selected === value}
            onClick={() => setSelected(value)}
          >
            {label}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}
